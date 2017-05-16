var robo_posx=4;        
var robo_posy=2;
var robo_2_x=1;
var robo_2_y=2;
var bw ;
var bh;
var x= 35+(robo_posx*80)-80;
var y= 35+(robo_posy*80)-80;
var r_x=35+(robo_2_x*80)-80;
var r_y=35+(robo_2_y*80)-80;
var p = 20;
var dx = 80;
var dy = 80;
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var fileData,fileData_conf,fileData2;
var array,array1,array2;
var allText,i=0,j=0;
var count=0,count1=0,count2=0,flag=0,flag1=0,flag2=0,coin_count=0;
var drop_cnt=0,coin_count2=0;
var flag_drop=0,flag_drop1=0,flag_drop2=0,speed=800,inter;
var a=0,b=0,drop1_x=0,drop1_y=0,drop2_x=0,drop2_y=0;
var audio = new Audio('sound/catch.mp3');
var audio_d = new Audio('sound/drop.mp3');
var bg = new Audio('sound/bg.mp3');
function readFile()
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "inputs/command.txt", true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            fileData = rawFile.responseText;
	}
    }
    rawFile.send();
    return fileData;
}
function readFile_robo2()
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "inputs/robo2.txt", true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            fileData2 = rawFile.responseText;
	}
    }
    rawFile.send();
    return fileData2;
}
function configure()
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "inputs/config", true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            fileData1 = rawFile.responseText;
	}
    }
    rawFile.send();
    return fileData1;
}

function fileopr()
{
    fileData=readFile();
    array = fileData.split('\n');
}
function fileopr2()
{
    fileData2=readFile_robo2();
    array2 = fileData2.split('\n');
}

function config_opr()
{
    
    fileData1=configure();
    array1 = fileData1.split('\n');
    var xpos=array1[0];
    var xb=array1[1];
    var coin2=array1[2];
    var coin3=array1[3];
    var wall=array1[4];
    temp=xpos.split(' ');
    temp1=xb.split(' ');
    temp2=coin2.split(' ');
    temp3=coin3.split(' ');
    temp4=wall.split(' ');
    config_opr.no_w = temp[0];
    config_opr.no_c=temp[1];
    config_opr.coin1_x=temp1[0];
    config_opr.coin1_y=temp1[1];
    config_opr.coin2_x=temp2[0];
    config_opr.coin2_y=temp2[1];
    config_opr.coin3_x=temp3[0];
    config_opr.coin3_y=temp3[1];
    config_opr.wall_x=temp4[0];
    config_opr.wall_y=temp4[1];
}
function drawBoard() 
{
    for (var n = 0; n <= bw; n += 80)
    {
        context.moveTo(0.5 + n + p, p);
        context.lineTo(0.5 + n + p, bh + p);
    }
    for (var m = 0; m <= bh; m += 80)
    {
        context.moveTo(p, 0.5 + m + p);
        context.lineTo(bw + p, 0.5 + m + p);
    }
    context.strokeStyle = "black";
    context.stroke();
}

function drawRobo()
{
    var img = new Image();
    img.onload = function () {
	context.drawImage(img, x,y,55,55);
    }
    img.src = "img/robo.jpg";
}
function drawRobo2()
{
    var img = new Image();
    img.onload = function () {
	context.drawImage(img, r_x,r_y,55,55);
    }
    img.src = "img/robo.jpg";
}


function drawCoin()
{
    var img = new Image();
    img.onload = function () {
	context.drawImage(img,coin1_x_x,coin1_x_y,50,50);
    }
    img.src = "img/coin.jpg";
}
function drawCoin1()
{
    var img = new Image();
    img.onload = function () {
	context.drawImage(img, coin2_x_x,coin2_x_y,50,50);
    }
    img.src = "img/coin.jpg";
}
function drawCoin3()
{
    var img = new Image();
    img.onload = function () {
	context.drawImage(img, coin3_x_x,coin3_x_y,50,50);
    }
    img.src = "img/coin.jpg";
}
function drawWall()
{
    var img = new Image();
    img.onload = function () {
	context.drawImage(img,wall_x_x,wall_x_y,50,50);
    }
    img.src = "img/wall.jpg";
}

function  drop_coin1(x,y)
{
    var img = new Image();
    img.onload = function () {
	context.drawImage(img, x,y,50,50);
    }
    img.src = "img/coin.jpg";
}
function  drop_coin2(x,y)
{
    var img = new Image();
    img.onload = function () {
	context.drawImage(img, x,y,50,50);
    }
    img.src = "img/coin.jpg";
}
function  drop_coin3(x,y)
{
    var img = new Image();
    img.onload = function () {
	context.drawImage(img, x,y,50,50);
    }
    img.src = "img/coin.jpg";
}
function clear()
{
  ctx.clearRect(0, 0, bw+100, bh+100);
}



function make_Moves()
{
    
    var s=array[i++];
    switch (s)
    {
	case "up":
	if (y - dy > 0)
        {
	    if(x==coin1_x_x && y==coin1_x_y)
	    {
		count++;
		if(count==1)
		{
		    audio.play();
		    flag=1;
		    coin_count++;
		}
		else
		{
		    y -= dy;
		}
	    }
	    if(x==coin2_x_x && y==coin2_x_y)
	    {
		count1++;
		if(count1==1)
		{
		    audio.play();
		    flag1=1;
		    coin_count++;
		}
		else
		{
		    y -= dy;
		}
	    }
	    if(x==coin3_x_x && y==coin3_x_y)
	    {
		count2++;
		if(count2==1)
		{
		    audio.play();
		    flag2=1;
		    coin_count++;
		}
		else
		{
		    y -= dy;
		}
	    }
	    if(x==(wall_x_x) && y==(wall_x_y+80))
	    {
		break;
	    }
	    else
	    {
		y -= dy;
	    }
        }
	else
	{
	    alert("Wrong Direction");
	}
        break;
        case "down":  
        if (y + dy < bh )
	{
	    if(x==coin1_x_x && y==coin1_x_y)
	    {
		count++;
		if(count==1)
		{
		    audio.play();
		    flag=1;
		    coin_count++;
		}
		else
		{
		    y += dy;
		}
	    }
	    if(x==coin2_x_x && y==coin2_x_y)
	    {
		count1++;
		if(count1==1)
		{
		    audio.play();
		    flag1=1;
		    coin_count++;
		}
		else
		{
		    y += dy;
		}
	    }
	    if(x==coin3_x_x && y==coin3_x_y)
	    {
		count2++;
		if(count2==1)
		{
		    audio.play();
		    flag2=1;
		    coin_count++;
		}
		else
		{
		    y += dy;
		}
	    }
	    if(x==wall_x_x && y==(wall_x_y-80))
	    {
		break;
	    }
	    else
	    {
		y += dy;
	    }
	}
	else 
	{
	    alert("Wrong Direction");
	}
	break ;
	case "left":  
	if (x - dx > 0  )
	{
	    if(x==coin1_x_x && y==coin1_x_y)
	    {
		count++;
		if(count==1)
		{
		    flag=1;
		    audio.play();
		    coin_count++;
		}
		else
		{
		    x -= dx;
		}
	    }
	    if(x==coin2_x_x && y==coin2_x_y)
	    {
		count1++;
		if(count1==1)
		{
			 flag1=1;
		    audio.play();
		    coin_count++;
		}
		else
		{
		    x -= dx;
		}
	    }
	    if(x==coin3_x_x && y==coin3_x_y)
	    {
		count2++;
		if(count2==1)
		{
		    flag2=1;
		    audio.play();
		    coin_count++;
		}
		else
		{
		    x -= dx;
		}
	    }
	    if(x==(wall_x_x+80) && y==(wall_x_y))
	    {
		break;
	    }
	    else
	    {
		x -= dx;
	    }
	}
	else
	{
	    alert("Wrong Direction");
	}
	break;
	case "right":  
        if (x + dx < bw )
	{
	    if(x==coin1_x_x && y==coin1_x_y)
	    {
		count++;
		if(count==1)
		{
		    flag=1;
		    audio.play();
		    coin_count++;
		}
		else
		{
		    x += dx;
		}
	    }
	    if(x==coin2_x_x && y==coin2_x_y)
	    {
		count1++;
		if(count1==1)
		{
		    flag1=1;
		    audio.play();
		    coin_count++;
		}
		else
		{
		    x += dx;
		}
	    }
	    if(x==coin3_x_x && y==coin3_x_y)
	    {
		count2++;
		if(count2==1)
		{
		    audio.play();
		    flag2=1;
		    coin_count++;
		}
			 else
		{
		    x += dx;
		}
	    }
	    if(x==(wall_x_x-80) && y==(wall_x_y))
	    {
		break;
	    }
	    else
	    {
		x += dx;
	    }
	}
	else
	{
	    alert("Wrong Direction");
	}
	break;
	case "drop":
	if(coin_count<1)
	{
	    alert("No coin left");
	}
	else
	{
	    drop_cnt++;
	    if(drop_cnt==1)
	    {
		flag_drop=1;
		a=x,b=y;
		coin_count--;
		audio_d.play();
	    }
	    if(drop_cnt==2)
	    {
		flag_drop1=1;
		drop1_x=x;drop1_y=y;
		coin_count--;
		audio_d.play();
	    }
	    if(drop_cnt==3)
	    {
		flag_drop2=1;
		drop2_x=x;drop2_y=y;
		coin_count--;
		audio_d.play();
	    }
	}
	break;
	
    }
}
function make_Moves_robo2()
{
    var s=array2[j++];
    switch (s)
    {
	case "up":
	if (r_y - dy > 0)
             {
		 if(r_x==coin1_x_x && r_y==coin1_x_y)
		 {
		     count++;
		     if(count==1)
		     {
			 audio.play();
			 flag=1;
			 coin_count2++;
		     }
		     else
		     {
			 r_y -= dy;
		     }
		 }
		 if(r_x==coin2_x_x && r_y==coin2_x_y)
		 {
		     count1++;
		     if(count1==1)
		     {
			 audio.play();
			 flag1=1;
			 coin_count2++;
		     }
		     else
		     {
			 r_y -= dy;
		     }
		 }
		 if(r_x==coin3_x_x && r_y==coin3_x_y)
		 {
		     count2++;
		     if(count2==1)
		     {
			 audio.play();
			 flag2=1;
			 coin_count2++;
		     }
		     else
		     {
			 r_y -= dy;
		     }
		 }
		if(r_x==(wall_x_x) && r_y==(wall_x_y+80))
		 {
		     break;
		 }
		 else
		 {
		     r_y -= dy;
		 }
             }
	else
	{
	    alert("Wrong Direction");
	}
            break;
        case "down":  
             if (r_y + dy < bh )
	    {
		 if(r_x==coin1_x_x && r_y==coin1_x_y)
		 {
		     count++;
		     if(count==1)
		     {
			 audio.play();
			 flag=1;
			 coin_count2++;
		     }
		     else
		     {
			 r_y += dy;
		     }
		 }
		if(r_x==coin2_x_x && r_y==coin2_x_y)
		{
		    count1++;
		    if(count1==1)
		    {
			audio.play();
			flag1=1;
			 coin_count2++;
		    }
		     else
		    {
			r_y += dy;
		    }
		}
		if(r_x==coin3_x_x && r_y==coin3_x_y)
		{
		    count2++;
		    if(count2==1)
		    {
			audio.play();
			flag2=1;
			coin_count2++;
		    }
		     else
		    {
			r_y += dy;
		    }
		}
		if(r_x==wall_x_x && _y==(wall_x_y-80))
		{
		    break;
		}
		else
		{
		    r_y += dy;
		}
	    }
	else 
	{
	    alert("Wrong Direction");
	}
	    break ;
	case "left":  
	    if (r_x - dx > 0  )
	     {
		 if(r_x==coin1_x_x && r_y==coin1_x_y)
		 {
		     count++;
		     if(count==1)
		     {
			 audio.play();
			 flag=1;
			 coin_count2++;
		     }
		     else
		     {
			r_x -= dx;
		     }
		 }
		 if(r_x==coin2_x_x && r_y==coin2_x_y)
		 {
		     count1++;
		     if(count1==1)
		     {
			 audio.play();
			 flag1=1;
			 coin_count2++;
		     }
		     else
		     {
			 r_x -= dx;
		     }
		 }
		 if(r_x==coin3_x_x && r_y==coin3_x_y)
		 {
		     count2++;
		     if(count2==1)
		     {
			 audio.play();
			 flag2=1;
			 coin_count2++;
		     }
		     else
		     {
			r_x -= dx;
		     }
		 }
		 if(r_x==(wall_x_x+80) && r_y==(wall_x_y))
		 {
		     break;
		 }
		 else
		 {
		    r_x -= dx;
		 }
	     }
	    else
	    {
		alert("Wrong Direction");
	    }
	    break;
	case "right":  
        	if (r_x + dx < bw )
	         {
		     if(r_x==coin1_x_x && r_y==coin1_x_y)
		     {
			 count++;
			 if(count==1)
			 {
			     audio.play();
			     flag=1;
			     coin_count2++;
			 }
			 else
			 {
			    r_x += dx;
			 }
		     }
		     if(r_x==coin2_x_x && r_y==coin2_x_y)
		     {
			 count1++;
			 if(count1==1)
			 {
			     audio.play();
			     flag1=1;
			     coin_count2++;
			 }
			 else
			 {
			     r_x += dx;
			 }
		     }
		     if(r_x==coin3_x_x && r_y==coin3_x_y)
		     {
			 count2++;
			 if(count2==1)
			 {
			     audio.play();
			     flag2=1;
			     coin_count2++;
			 }
			 else
			 {
			     r_x += dx;
			 }
		     }
		     if(r_x==(wall_x_x-80) && r_y==(wall_x_y))
		     {
			 break;
		     }
		     else
		     {
			r_x += dx;
		     }
		 }
	    else 
	     {
	 	alert("Wrong Direction");
	     }
	break;
	case "drop":
	if(coin_count2<1)
	{
	    alert("No coin left");
	}
	else
	{
	    drop_cnt++;
	    if(drop_cnt==1)
	    {
		flag_drop=1;
		a=r_x,b=r_y;
		coin_count2--;
		audio_d.play();
	    }
	    if(drop_cnt==2)
	    {
		flag_drop1=1;
		drop1_x=r_x;drop1_y=r_y;
		coin_count2--;
		audio_d.play();
	    }
	    if(drop_cnt==3)
	    {
		flag_drop2=1;
		drop2_x=r_x;drop2_y=r_y;
		coin_count2--;
		audio_d.play();
	    }
	}
	break;
	
    }
}

function init_var()
{
   
    bw = config_opr.no_w*80;
    bh = config_opr.no_c*80;
    canvas.width  = bw+70;
    canvas.height = bh+70;
    coin1_x_x=35+(config_opr.coin1_x*80)-80;
    coin1_x_y=35+(config_opr.coin1_y*80)-80;
    coin2_x_x=35+(config_opr.coin2_x*80)-80;
    coin2_x_y=35+(config_opr.coin2_y*80)-80;
    coin3_x_x=35+(config_opr.coin3_x*80)-80;
    coin3_x_y=35+(config_opr.coin3_y*80)-80;
    wall_x_x=35+(config_opr.wall_x*80)-80;
    wall_x_y=35+(config_opr.wall_y*80)-80;
}
function Set_Gradient()
{
    var c=document.getElementById("canvas");
    var ctx=c.getContext("2d");
    var my_gradient=ctx.createLinearGradient(0,0,0,170);
    my_gradient.addColorStop(0,"#ff00cc");
    my_gradient.addColorStop(1,"#333399");
    ctx.fillStyle=my_gradient;
    ctx.fillRect(20,20,bw,bh); 
}
function run()
{
    ctx = canvas.getContext("2d");
    inter= setInterval(All_function_call,speed);
}
function pick_coin()
{
    if(flag==0)
    {
	drawCoin();
    }
    if(flag1==0)
    {
	drawCoin1();
    }
    if(flag2==0)
    {
	drawCoin3();
    }
    if(flag_drop==1)
    {
	drop_coin1(a,b);
    }
    if(flag_drop1==1)
    {
	drop_coin2(drop1_x,drop1_y);
    }
    if(flag_drop2==1)
    {
	drop_coin3(drop2_x,drop2_y);
    }
    context.font = '15pt Aria';
    context.fillStyle = 'black';
    ctx.fillText(coin_count,x+3,y+3);
    ctx.fillText(coin_count2,r_x+3,r_y+3);
    if(array[i]==null)
    {
	context.font = '12pt Aria';
	ctx.fillText("no cmd",x+10,y+60);
    }
    else
    {
	context.font = '15pt Aria';
	context.fillStyle = 'black';
	ctx.fillText(array[i],x+10,y+70);
    }
   if(array2[j]==null)
    {
	context.font = '12pt Aria';
	ctx.fillText("no cmd",r_x+10,r_y+70);
    }
    else
    {
	context.font = '15pt Aria';
	context.fillStyle = 'black';
	ctx.fillText(array2[j],r_x+10,r_y+60);
    }
    if((array[i]==null) && (array2[j]==null))
    {
	clearInterval(inter);
    }
}
function clear_screen()
{
    clear();
    context.fillStyle = "black";
    context.strokeStyle = "white";
}
function speed_up(evt)
{
    switch (evt.keyCode)
    {
	case 38: // up button keycode
	speed=speed+100;
	setInterval(All_function_call,speed);
	break;
	case 40: // down button keycode
	speed=speed-100;
	setInterval(All_function_call,speed);
	break;
    }
}

function All_function_call()
{
    clear_screen();
    fileopr();
    fileopr2();
    config_opr();
    init_var();
    Set_Gradient();
    drawBoard();
    drawRobo();
    drawRobo2();
    drawWall();
    make_Moves();
    make_Moves_robo2();
    pick_coin();
   
}
window.addEventListener('keydown',speed_up,true);
run();
