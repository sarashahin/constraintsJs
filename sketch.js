// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite;

    let engine;
    let ground;
    let constraint1;
    let poly1A;
    let poly1B;

    // for world
    let poly2;
    let constraint2;

    let poly3;
    let constraint3;

    let canvas;
   
function setup() {
   canvas = createCanvas(900, 600);
    //create Engine
    engine = Engine.create();
    poly1A = Bodies.polygon(700, 100, 6, 20);
    poly1B = Bodies.polygon(700, 250, 1, 50);

    //add constraint1
    constraint1 = Constraint.create({
                                    bodyA : poly1A,
                                    pointA : {x : 0, y : 0},
                                    bodyB : poly1B,
                                    pointB : {x : -10, y : - 10},
                                    stiffness : 0.1
                                    });
                                
    // add all of the bodies to the world
    Composite.add(engine.world, [poly1A, poly1B, constraint1]);

    poly2 = Bodies.polygon(100, 200, 5, 40);
    // add obj attach to spefic point in world
    constraint2 = Constraint.create({
                                    pointA : {x : 150, y : 50},
                                    bodyB : poly2,
                                    pointB : {x : -10, y : - 20}
                                    });
    
    Composite.add(engine.world, [poly2, constraint2]);

    poly3 = Bodies.polygon(400, 100, 4, 30);
    constraint3 = Constraint.create({
                                    pointA : {x : 400, y : 120},
                                    bodyB : poly3,
                                    pointB : {x : -10, y : - 10},
                                    stiffness : 0.001,
                                    damping : 0.05
                                    });

    Composite.add(engine.world, [poly3, constraint3]);

    //ground
    ground = Bodies.rectangle(width / 2, height - 10, 900, 10, {isStatic: true});
    Composite.add(engine.world, [ground]);

    // pass canvas to matter.js and retreive the position of the mouse, elt give us HTML canvas
    let mouse = Mouse.create(canvas.elt);
    let mouseParams = 
    {
        mouse : mouse
    };
    let mouseConstraint = MouseConstraint.create(engine, mouseParams);
    // to work on your pc
    mouseConstraint.mouse.pixelRatio = pixelDensity();
    
    Composite.add(engine.world, mouseConstraint);
}

function draw() 
{
    background(0);
    Engine.update(engine);

    fill(200, 30, 10);
    drawVertices(poly1A.vertices);
    fill(200, 130, 10);
    drawVertices(poly1B.vertices);

    fill(200, 130, 110);
    drawVertices(poly2.vertices);

    fill(100, 130, 210);
    drawVertices(poly3.vertices);

    stroke(55);
    strokeWeight(3);
    drawConstraint(constraint1);

    drawConstraint(constraint2);

    drawConstraint(constraint3);

    noStroke();
    fill(125);
    drawVertices(ground.vertices);
}

// ********** HELPER FUNCTIONS *************
function drawConstraint(constraint) {
    var offsetA = constraint.pointA;
    var posA = {x:0, y:0};
    if (constraint.bodyA) {
      posA = constraint.bodyA.position;
    }
    var offsetB = constraint.pointB;
    var posB = {x:0, y:0};
    if (constraint.bodyB) {
      posB = constraint.bodyB.position;
    }
    line(
      posA.x + offsetA.x,
      posA.y + offsetA.y,
      posB.x + offsetB.x,
      posB.y + offsetB.y
    );
  }

function drawVertices(vertices)
{
    beginShape();
    for(let i = 0; i < vertices.length; i++)
    {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}
