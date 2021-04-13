import os, shutil

ROOT = "./build/"
DESTINATION = "./min/"
HTML_FILE = DESTINATION + "index.html"
HTML_SRC_FILE = DESTINATION + "indexbase.html"

def init():
  if os.path.exists(HTML_FILE): 
    os.remove(HTML_FILE)
  shutil.copyfile(HTML_SRC_FILE, HTML_FILE)



def string_insert(base_string : str, string_to_insert : str, index : int):
  return base_string[:index] + string_to_insert + base_string[index:]


def insert_css_file(html_file_str, css_file_name):
  with open(css_file_name, "r+") as css_file:
    position = html_file_str.find("<style>") + len("<style>")
    html_file_str = string_insert(html_file_str, css_file.read(), position)
  return html_file_str
    

def insert_js_file(html_file_str, js_file_name):
  with open(js_file_name, "r+") as js_file:
    position = html_file_str.find("<script>") + len("<script>")
    html_file_str = string_insert(html_file_str, js_file.read(), position)
  return html_file_str
    








def main():
  init()
  with open("./min/index.html", 'r+') as html_file:
    html_string = html_file.read()
    html_string = insert_css_file(html_string, "./build/component.css")
    html_string = insert_css_file(html_string, "./build/index.css")
    
    html_string = insert_js_file(html_string, "./build/component.js")
    html_string = insert_js_file(html_string, "./build/tab.js")
    html_string = insert_js_file(html_string, "./build/index.js")
    html_string = insert_js_file(html_string, "./build/Libs/pureknobMin.js")

    html_file.seek(0)
    html_file.write(html_string)

  


if __name__ == "__main__": main()
