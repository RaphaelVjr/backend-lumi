# watcher.py

import os
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class MyHandler(FileSystemEventHandler):
    def on_created(self, event):
        # This method is called when a new file is added
        if event.is_directory:
            return
        filename = event.src_path
        print(f"New file added: {filename}")
        # Add your logic here to run the corresponding Python script (script.py) based on the filename
        if filename.endswith(".pdf"):
            # Example: Run script.py when a new .txt file is added
            os.system("python script.py")

if __name__ == "__main__":
    path_to_watch = "invoices"
    event_handler = MyHandler()
    observer = Observer()
    observer.schedule(event_handler, path_to_watch, recursive=True)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
