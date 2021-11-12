# Script which generates minified and compressed application 
# which is ready to upload it to ESP32/8266 SPIFFS
# Script merges index.js, component.js, index.css, component.css into single index.html filesToMinify
# Because transferring one big file is safer and more reliable than transfering multiple files by ESP
# Created by Norbert Bielak (detmot5)


import os, shutil
from to1File import merge_sources



ROOT_DIR = "./"
BUILD_DIR = ROOT_DIR + "data"
TMP_DIR = ROOT_DIR + "tmp"


filesToMinify = [
  "index.js",
  "tab.js",
  "index.css",
  "component.css",
]

def minifyFile(fileName):
  return os.system(f"minify {ROOT_DIR}{fileName} > {TMP_DIR}/{fileName}")


def minify():
  print("Compressing website files...")
  for file in filesToMinify: 
    if(minifyFile(file) != 0):
      print("Error compressing " + file)
      return False
  return True



# def merge_sources():
#   print("Merging sources")
#   with open('index_build.html') as f: 
#     indexHtmlData = f.read()
#     scriptIndex = indexHtmlData.find("<script>") + 8
#     styleIndex = indexHtmlData.find("<style>") + 7 

#     with open("Libs/pureknobMin.js") as pureKnobJS:
#       pureKnobJsDaa = pureKnobJS.read()
#       indexHtmlData[:scriptIndex] + pureKnobJsDaa + indexHtmlData[scriptIndex:]
#     with open("tmp/tab.js") as tabJS:
#       tabJSData = tabJS.read()   
#       indexHtmlData = indexHtmlData[:scriptIndex] + tabJSData + indexHtmlData[scriptIndex:]
#     with open("tmp/component.js") as componentJS:
#       componentJSData = componentJS.read()   
#       indexHtmlData = indexHtmlData[:scriptIndex] + componentJSData + indexHtmlData[scriptIndex:]
#     with open("tmp/index.js") as indexJS:
#       indexJSData = indexJS.read()   
#       indexHtmlData = indexHtmlData[:scriptIndex] + indexJSData + indexHtmlData[scriptIndex:]
#     with open("tmp/component.css") as component_css:
#       component_css_data = component_css.read()
#       indexHtmlData = indexHtmlData[:styleIndex] + component_css_data + indexHtmlData[styleIndex:]
#     with open("tmp/index.css") as index_css:
#       index_css_data = index_css.read()
#       indexHtmlData = indexHtmlData[:styleIndex] + index_css_data + indexHtmlData[styleIndex:]

#   with open(f'{BUILD_DIR}/index.html', "w") as f:  
#     f.write(indexHtmlData)

      
      

def copyData():
  print("Copying libraries...")
  try:
    shutil.copytree(ROOT_DIR + "Libs", f"{BUILD_DIR}/Libs")
    shutil.copytree(ROOT_DIR + "Images", f"{BUILD_DIR}/images")
    shutil.copyfile(ROOT_DIR + "component.js", f"{TMP_DIR}/component.js")
    shutil.copyfile(ROOT_DIR + "favicon.ico", f"{BUILD_DIR}/favicon.ico")
  except:
    return False 
  return True





def main():  
  if "data" not in os.listdir(ROOT_DIR):
    os.mkdir(BUILD_DIR)
  print("Cleaning website project...")
  for file in os.listdir(BUILD_DIR):
    filepath = f"{BUILD_DIR}/{file}"
    if os.path.isdir(filepath): shutil.rmtree(filepath)
    else: os.remove(filepath)
  print("Running website build script...")
  if "tmp" in os.listdir('./'):
    shutil.rmtree(TMP_DIR)
  os.mkdir(TMP_DIR)
  if(minify() == False):
    print("Minify failed")
    exit(1)
  if(copyData() == False):
    print("Copy failed")
    exit(1)
  merge_sources()
  shutil.rmtree(TMP_DIR)
  print("Application minified and ready to upload to device!")



if __name__ == "__main__": main()
