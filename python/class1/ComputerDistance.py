import turtle

x1, y1 = eval(input("输入点1的x,y坐标值："))
x2, y2 = eval(input("输入点2的x,y坐标值："))
distance = ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))**0.5
turtle.penup()
turtle.goto(x1, y1)
turtle.pendown()
turtle.write("点1")
turtle.goto(x2, y2)
turtle.write("点2")

turtle.penup()
turtle.goto((x1 + x2) / 2, (y1 + y2) / 2)
turtle.write(distance)
turtle.done()
