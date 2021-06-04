var Engine=Matter.Engine
var Bodies=Matter.Bodies
var World=Matter.World

var Ut={
    h:window.innerHeight
    ,w:window.innerWidth
}

circs=[]

function setup(){
    engineSetup()
    frameRate(250)
   bx= new Box(550,150,450,10,{isStatic:true,angle:radians(10)})
     bx2= new Box(900,450,600,10,{isStatic:true,angle:56})
    
}
function mousePressed(){
    
}
function draw(){
    background(55)
    
    bx.show(()=>{
        stroke(105,25,0)
        fill(205,125,0)
    })
    bx2.show(()=>{
        stroke(14)
        fill(205)
    })
    circs.push(new Particle(mouseX,mouseY,random(7),{friction:0,restitution:0.41}))

    
for(i=0;i<circs.length;i++){
   
   circs[i].show(()=>{
       noStroke()
       fill(0,200,250)
   })
   if(circs[i].isOffScreen()){
       circs[i].destroy()
       circs.splice(i,1)
       i--
       
   }

    }
    
    Engine.update(engineV8)
    
}

//setup
function engineSetup(){
    createCanvas(Ut.w,Ut.h)
    engineV8=Engine.create()
    earth=engineV8.world
    World.add(earth,engineV8)

}
//box object
class Box{
    constructor(x,y,w,h,props={}){
        this.width=w
        this.height=h
        this.props=props
        this.body=Bodies.rectangle(x,y,w,h,props)
        World.add(earth,this.body)
    }
    show(styler){
         this.x=this.body.position.x
         this.y=this.body.position.y
         this.ang=this.body.angle
         push()
         translate(this.x,this.y)
         rotate(this.ang)
         rectMode(CENTER)
         if(styler !=undefined){
             styler()
         }
         rect(0,0,this.width,this.height)
         pop()
    }
    isOffScreen(){
        return(this.y>height+this.height+100||this.x>width+this.width+100)
    }
    destroy(){
        World.remove(earth,this.body)
    }
}

//circle object
class Particle extends Box{
    constructor(x,y,r,props={}){
        super(x,y,r,r,props)
        this.radius=r
        this.props=props
        this.body=Bodies.circle(x,y,r,props)
        World.add(earth,this.body)
    }
    show(styler){
         this.x=this.body.position.x
         this.y=this.body.position.y
         this.ang=this.body.angle
         push()
         translate(this.x,this.y)
         rotate(this.ang)
         if(styler !=undefined){
             styler()
         }
         ellipse(0,0,this.radius*2)
         pop()
    }
}