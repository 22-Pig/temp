import math

a = int(input())
b = int(input())
c = int(input())

s = (a + b + c) / 2

area = math.sqrt(s * (s - a) * (s - b) * (s - c))  #'*'表示乘，math.sqrt 表示开根号
print("三角形的边长:", a, b, c, end='')
print("三角形的面积:", area)
