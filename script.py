import os
import psycopg2
import re
from pdfminer.high_level import extract_text
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv("DATABASE_USER")
DB_PASSWORD = os.getenv("DATABASE_PASSWORD")
DB_HOST = os.getenv("DATABASE_HOST")
DB_PORT = os.getenv("DATABASE_PORT")
DB_NAME = os.getenv("DATABASE_NAME")

def extract_data_from_pdf(pdf_path):
    global id

    text = extract_text(pdf_path)
    lines = text.split('\n')

    energia_eletrica_valor = 0
    numero_cliente = None
    mes_referencia = None
    energia_scee_isenta = 0
    contrib_ilum_publica = 0
    energia_eletrica_quantidade = 0
    energia_scee_quantidade = 0
    energia_scee_valor = 0
    energia_compensada_valor = 0
    energia_compensada_quantidade = 0


    for i in range(len(lines)):
        if "Nº DO CLIENTE" in lines[i]:
            if i + 1 < len(lines):
                numero_cliente_line = lines[i + 1].strip()
                print(f"numero_cliente_line: {numero_cliente_line}")
                numero_cliente = numero_cliente_line.split()[0]
                print(f"numero_cliente: {numero_cliente}") 

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
                energia_scee_quantidade = 0
                energia_scee_valor = 0
                
        if "Energia SCEE ISENTA" in lines[i] and not energia_scee_isenta:
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
                energia_scee_quantidade = 0
                energia_scee_valor = 0

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
                energia_eletrica_quantidade = 0
                energia_eletrica_valor = 0

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
                energia_compensada_quantidade = 0
                energia_compensada_valor = 0

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
                contrib_ilum_publica = 0

    return (numero_cliente, mes_referencia, energia_eletrica_quantidade, energia_eletrica_valor, energia_scee_quantidade, energia_scee_valor, energia_compensada_quantidade, energia_compensada_valor, contrib_ilum_publica)

def insert_into_postgres(data):
    connection = psycopg2.connect(
        user="default",
        password="5CaMwAT9lYpc",
        host="ep-ancient-breeze-a469x2p4-pooler.us-east-1.aws.neon.tech",
        port="5432",
        database="verceldb"
    )

    cursor = connection.cursor()

    try:
        numero_cliente, mes_referencia = data[1], data[2]  

        check_query = "SELECT * FROM invoices WHERE numero_cliente = %s AND mes_referencia = %s;"
        cursor.execute(check_query, (numero_cliente, mes_referencia))

        if cursor.fetchone() is None:
            insert_query = "INSERT INTO invoices (id, numero_cliente, mes_referencia, energia_eletrica_quantidade, energia_eletrica_valor, energia_scee_quantidade, energia_scee_valor, energia_compensada_quantidade, energia_compensada_valor, contrib_ilum_publica) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
            cursor.execute(insert_query, data)
            connection.commit()
        else:
            print(f"A record with numero_cliente {numero_cliente} and mes_referencia {mes_referencia} already exists.")
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
    pdf_folder = "invoices"
    process_pdfs(pdf_folder)