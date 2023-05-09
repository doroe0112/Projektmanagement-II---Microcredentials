#!/usr/bin/python3

f = open('skills.csv', 'r')
content = f.read()
f.close()

#content = content.replace("\n", "")
content = content.split("\n")

#print(type(content))

str1 = ["skills = ["]

for i in range(1, len(content)):
 #print(content[i])
 str1.append("(")
 skill = content[i].split(",")
 skillname = skill[0]

 #print(skillname, end=": ")
 if ( len(skillname) == 0 ):
  break

 str1.append( "'" + skillname + "'")
 str1.append( ", " )

 bits = ""
 for j in range(1, len(skill)):
  #print(skill[j], end="")
  if len( skill[j] ) == 0:
   #print("0", end="")
   bits = "0" + bits
  elif ( skill[j] == "0" ):
   #print("0", end="")
   bits = "0" + bits
  else:
   #print("1", end="")
   bits = "1" + bits
 bitmuster = int(bits, 2)
 str1.append(str(bitmuster))
 str1.append("),\n")
 #print( bits )

str1.pop(-1)
str1.pop(-1)
str1.append(")]")

#print("".join(str1))

f = open("Prototype/skillBits.py", "w")
f.write( "".join(str1) )
f.close()

