import os, shutil



ROOT_DIR = "/Dev/Projects/Embedded/Ra/HTML_Generator/Workspace/Website/frontend-rafal-vanila/"
BUILD_DIR = ROOT_DIR + "build"


filesToMinify = [
  "index.js",
  "index.css",
  "component.css",
]

def minifyFile(fileName):
  return os.system(f"minify {ROOT_DIR}{fileName} > {BUILD_DIR}/{fileName}")


def minify():
  print("Compressing website files...")
  for file in filesToMinify: 
    if(minifyFile(file) != 0):
      print("Error compressing " + file)
      return False
  return True

def copyData():
  print("Copying libraries...")
  try:
    shutil.copytree(ROOT_DIR + "Libs", f"{BUILD_DIR}/Libs")
    shutil.copytree(ROOT_DIR + "images", f"{BUILD_DIR}/images")
    shutil.copyfile(ROOT_DIR + "component.js", f"{BUILD_DIR}/component.js")
    shutil.copyfile(ROOT_DIR + "index.html", f"{BUILD_DIR}/index.html")
    shutil.copyfile(ROOT_DIR + "favicon.ico", f"{BUILD_DIR}/favicon.ico")
  except:
    return False 
  return True





def main():  
  print("Cleaning website project...")
  for file in os.listdir(BUILD_DIR):
    filepath = f"{BUILD_DIR}/{file}"
    if os.path.isdir(filepath): shutil.rmtree(filepath)
    else: os.remove(filepath)
  print("Running website build script...")
  if(minify() == False):
    print("Minify failed")
    exit(1)
  if(copyData() == False):
    print("Copy failed")
    exit(1)
  print("Website build script end")



if __name__ == "__main__": main()
