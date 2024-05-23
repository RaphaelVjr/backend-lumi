import os
import psycopg2
import re
from pdfminer.high_level import extract_text
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

def extract_data_from_pdf(pdf_path):
    global id

    text = extract_text(pdf_path)
    lines = text.split('\n')

    energia_eletrica_valor = None
    numero_cliente = None
    mes_referencia = None
    contrib_ilum_publica = None
    energia_eletrica_quantidade = None
    energia_scee_quantidade = None
    energia_scee_valor = None
    energia_compensada_valor = None
    energia_compensada_quantidade = None


    for i in range(len(lines)):
        if "Nº DO CLIENTE" in lines[i]:
            if i + 1 < len(lines):
                numero_cliente_line = lines[i + 1].strip()
                numero_cliente = numero_cliente_line.split()[0]

        if "Referente a" in lines[i]:
            mes_referencia = lines[i + 1].strip()
            match = re.search(r'\b([A-Za-z]{3}/\d{4})\b', mes_referencia)
            if match:
                mes_referencia = match.group(1)
            else:
                mes_referencia = None
                
        if "Energia SCEE s/ ICMS" in lines[i] and not energia_scee_quantidade:
            try:
                scee_quantidade_str = lines[i + 10].replace(',', '.').replace(' ', '')
                scee_valor_str = lines[i + 18].replace(',', '.').replace(' ', '')
                if id == 8:
                    scee_quantidade_str = lines[i + 11].replace(',', '.').replace(' ', '')
                    scee_valor_str = lines[i + 19].replace(',', '.').replace(' ', '')
                if id == 15:
                    scee_quantidade_str = lines[i + 12].replace(',', '.').replace(' ', '')
                    scee_valor_str = lines[i + 20].replace(',', '.').replace(' ', '')
                if id == 16:
                    scee_quantidade_str = lines[i + 13].replace(',', '.').replace(' ', '')
                    scee_valor_str = lines[i + 21].replace(',', '.').replace(' ', '')
                if scee_quantidade_str and scee_valor_str:
                    energia_scee_quantidade = float(scee_quantidade_str)
                    energia_scee_valor = float(scee_valor_str)
            except ValueError as e:
                print(f"Error extracting Energia SCEE data: {e}")

        if "Energia Elétrica" in lines[i] and not energia_eletrica_quantidade:
            try:
                quantidade_str = lines[i + 10].replace(',', '.').replace(' ', '')
                valor_str = lines[i + 18].replace(',', '.').replace(' ', '')
                if id == 8:
                    quantidade_str = lines[i + 11].replace(',', '.').replace(' ', '')
                    valor_str = lines[i + 19].replace(',', '.').replace(' ', '')
                if id == 15:
                    quantidade_str = lines[i + 12].replace(',', '.').replace(' ', '')
                    valor_str = lines[i + 20].replace(',', '.').replace(' ', '')
                if id == 16:
                    quantidade_str = lines[i + 13].replace(',', '.').replace(' ', '')
                    valor_str = lines[i + 21].replace(',', '.').replace(' ', '')
                if quantidade_str and valor_str:
                    energia_eletrica_quantidade = float(quantidade_str)
                    energia_eletrica_valor = float(valor_str)
            except ValueError as e:
                print(f"Conversion error: {e}")

        if "Energia compensada GD I" in lines[i] and not energia_compensada_quantidade:
            try:
                compensada_quantidade_str = lines[i + 10].replace(',', '.').replace(' ', '')
                compensada_valor_str = lines[i + 18].replace(',', '.').replace(' ', '')
                if id == 8:
                    compensada_quantidade_str = lines[i + 11].replace(',', '.').replace(' ', '')
                    compensada_valor_str = lines[i + 19].replace(',', '.').replace(' ', '')
                if id == 15:
                    compensada_quantidade_str = lines[i + 12].replace(',', '.').replace(' ', '')
                    compensada_valor_str = lines[i + 20].replace(',', '.').replace(' ', '')
                if id == 16:
                    compensada_quantidade_str = lines[i + 13].replace(',', '.').replace(' ', '')
                    compensada_valor_str = lines[i + 21].replace(',', '.').replace(' ', '')
                if compensada_quantidade_str and compensada_valor_str:
                    energia_compensada_quantidade = float(compensada_quantidade_str)
                    energia_compensada_valor = float(compensada_valor_str)
            except ValueError as e:
                print(f"Error extracting Energia compensada data: {e}")

        if "Contrib Ilum Publica Municipal" in lines[i] and not contrib_ilum_publica:
            try:
                contrib_str = lines[i + 15].replace(',', '.').replace(' ', '')
                if id == 8:
                    contrib_str = lines[i + 16].replace(',', '.').replace(' ', '')
                if id == 15:
                    contrib_str = lines[i + 17].replace(',', '.').replace(' ', '')
                if id == 16:
                    contrib_str = lines[i + 18].replace(',', '.').replace(' ', '')
                if contrib_str:
                    contrib_ilum_publica = float(contrib_str)
            except ValueError as e:
                print(f"Error extracting Contrib Ilum Publica data: {e}")

    return (numero_cliente, mes_referencia, energia_eletrica_quantidade, energia_eletrica_valor, energia_scee_quantidade, energia_scee_valor, energia_compensada_quantidade, energia_compensada_valor, contrib_ilum_publica)

def insert_into_postgres(data):
    connection = psycopg2.connect(
        user="postgres",
        password="151176",
        host="localhost",
        port="5432",
        database="postgres"
    )

    cursor = connection.cursor()

    try:
        insert_query = "INSERT INTO faturas (id, numero_cliente, mes_referencia, energia_eletrica_quantidade, energia_eletrica_valor, energia_scee_quantidade, energia_scee_valor, energia_compensada_quantidade, energia_compensada_valor, contrib_ilum_publica) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
        cursor.execute(insert_query, data)
        connection.commit()
    except Exception as e:
        connection.rollback()
        print(f"Error: {e}")
    finally:
        cursor.close()
        connection.close()

id = 0
def process_pdfs(pdf_folder):
    global id
    for filename in os.listdir(pdf_folder):
        id += 1
        if filename.endswith(".pdf"):
            pdf_path = os.path.join(pdf_folder, filename)
            data = extract_data_from_pdf(pdf_path)
            if data:
                data_with_id = (id,) + data
                insert_into_postgres(data_with_id)

if __name__ == "__main__":
    pdf_folder = "./faturas"
    process_pdfs(pdf_folder)