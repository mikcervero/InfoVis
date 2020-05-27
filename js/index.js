
const svg = d3.select('body')
    .append ('svg')
    .attr('width',1400)
    .attr('height',900)
    

//create margins and dimension
const margin= {top:20, right:20, bottom: 20, left:30};
const Swidth = 1400 - margin.left - margin.right;
const Sheight = 900 - margin.top - margin.bottom;

const YmaxBruco= 100+23;
const YminBruco= 65-3;
const XmaxBruco= 23+234;
const XminBruco= 135-10;

const YmaxFarfalla= 190;
const YminFarfalla= 75;
const XmaxFarfalla= 220;
const XminFarfalla= 50;


createBruchi(1);
 

function createBruchi(richiesta){
    
  
   
  d3.json('../data/bruchi.json').then( data => {
      
    console.log(richiesta);
    
    const bruchi= svg.append('g')
       .attr('class', 'bruchi')
       .attr('width',Swidth)
       .attr('height',Sheight)
       .attr('transform', 'translate('+ margin.left +','+ margin.top + ')');
    
    const animale= bruchi
        
    const color= '#c6f0cf'
    
    const backgroundBruchi= createBackground(animale,color);
     
    
    const brucoHeigth = YmaxBruco-YminBruco
    
    
    const y = d3.scaleLinear()
             .domain([0,d3.max(data,d=> d.spver) + YmaxBruco])
             .range([0,Sheight-brucoHeigth]);
    
    
    const brucoWidth = XmaxBruco-XminBruco
    
    const x = d3.scaleLinear()
             .domain([0,d3.max(data,d=> d.spor) + XmaxBruco])
             .range([0,Swidth-brucoWidth]);

    
    const bruco= bruchi.selectAll('.bruchi')
             .data(data)
           

    const group = bruco.enter().append('g')
         .attr('class', 'bruco')
         .attr('stroke', 'black')
         .attr('transform', function(d) { return "translate(" + x(d.spor) + "," + y(d.spver) + ")"; });
         
         
    disegnoBruco(group);
      
    if (richiesta==1){
       
        svg.selectAll('.bruco').on('click', handleClick);
      
      }

  });

}

const handleClick = (d,i,n) =>{
    
    d3.select(n[i]);

    svg.selectAll(".bruchi").remove();
//       .style("opacity", 0)
        
    createFarfalle();
    
};


function createFarfalle(){
    
    const farfalle= svg.append('g')
       .attr('class', 'farfalle')
       .attr('width',Swidth)
       .attr('height',Sheight)
       .attr('transform', 'translate('+ margin.left +','+ margin.top + ')')
    
    
    const animale= farfalle
    
    const color= '#adcdf0'
    
    const backgroundFarfalle= createBackground(animale,color);

    
    d3.json('../data/farfalle.json').then( data => {
        
        
        
        const farfallaHeigth = YmaxFarfalla-YminFarfalla

        const y = d3.scaleLinear()
            .domain([0,d3.max(data,d=> d.spver) + YmaxFarfalla])
            .range([0,Sheight-farfallaHeigth]);
        
        
        const farfallaWidth = XmaxFarfalla-XminFarfalla
             
        const x = d3.scaleLinear()
             .domain([0,d3.max(data,d=> d.spor) + XmaxFarfalla])
             .range([0,Swidth-farfallaWidth]);

      

        const farfalla= farfalle.selectAll('g')
              .data(data)
            
        

        const group2 = farfalla.enter().append('g').attr('class', 'farfalla').attr('transform', function(d) { return "translate(" + x(d.spor) + "," + y(d.spver) + ")"; });
        
        
        
        const alifarfalla= group2.append('g').attr('fill',d=> d.ali).attr('stroke',d=> d.contorno).attr("stroke-width", 2)
        
        const corpofarfalla= group2.append('g').attr('stroke', 'black');
        
        
        
        disegnoFarfalla(alifarfalla,corpofarfalla);
        
        svg.selectAll('.farfalla').on('click', handleClickFarf);
        
    });

    
}


const handleClickFarf = (d,i,n) => {
    
    d3.select(n[i]);

    svg.selectAll('.farfalle').remove();

    createFarfalleConfigurazioni();
};




function XScaleDomain(data,x) {

    var spostamenti = data["spostamenti"];

    x.domain([0, d3.max(spostamenti, function(d) { return d.spor; })+ XmaxFarfalla]);

}


function YScaleDomain(data,y){
    var spostamenti = data["spostamenti"];
    y.domain([0, d3.max(spostamenti, function(d) { return d.spver; })+YmaxFarfalla]);
}






function createFarfalleConfigurazioni() {
    
  const farfalle= svg.append('g')
       .attr('class', 'farfalle')
       .attr('width',Swidth)
       .attr('height',Sheight)
       .attr('transform', 'translate('+ margin.left +','+ margin.top + ')')
    
    const animale= farfalle
    
    const color= '#adcdf0'
    
    const backgroundFarfalle= createBackground(animale,color);

    d3.json('../data/configurazioni.json').then(function(data) {
    

   
    const farfallaHeigth = YmaxFarfalla-YminFarfalla;

    
    const farfallaWidth = XmaxFarfalla-XminFarfalla

    const y = d3.scaleLinear()
    .range([0,Sheight-farfallaHeigth]);

    const x = d3.scaleLinear()
    .range([0,Swidth-farfallaWidth]);

    var count=0;
        
     XScaleDomain(data[0],x);
     YScaleDomain(data[0],y);
     project(data[0],x,y,count,data);

     
    });

}

function project(data,x,y,count,allData){
   
   count++;

   var spostamenti = data["spostamenti"];

   const farfalla= svg.selectAll('.farfalle').selectAll('g')
          .data(spostamenti,function(d){return d.farfalla});

   const group2 = farfalla.enter().append('g').attr('class', 'farfallaConfig').attr('transform', function(d) { return "translate(" + x(d.spor) + "," + y(d.spver) + ")"; });


    const alifarfalla= group2.append('g').attr('fill',d=> d.ali).attr('stroke',d=> d.contorno).attr("stroke-width", 2)

    const corpofarfalla= group2.append('g').attr('stroke', 'black');
   
    disegnoFarfalla(alifarfalla,corpofarfalla);
   
    svg.selectAll('.farfallaConfig').on('click', function(d,i,n){
   
        d3.select(n[i]);

        svg.selectAll('.farfallaConfig').remove();
        
        if (count<5){
        
        prossimeConfigurazioni(allData[count],x,y,count,allData)
            
        }
        
        else {
            
            svg.selectAll('.farfalle').remove();
            createBruchi(2);
            
        }
       
        });
   
    
   
}


function prossimeConfigurazioni(data,x,y,count,allData) {
    
    XScaleDomain(data,x);
    YScaleDomain(data,y);
    project(data,x,y,count,allData);
        

}



function createBackground(animale,color){
    animale.append('rect')
           .attr('width',Swidth)
           .attr('height',Sheight)
           .attr('class', 'background')
           .attr('transform', 'translate('+ margin.left +','+ margin.top + ')')
           .attr('fill',color);
    
}





function disegnoFarfalla(alifarfalla,corpofarfalla){
    
    
     alifarfalla.append("path").attr("d", 'M 125 121 L 50 75 L 74 130 z');
     alifarfalla.append("path").attr("d", 'M 125 121 L 85 130 L 90 190 z');
     
     alifarfalla.append("path").attr("d", 'M 145 121 L 185 130 L 180 190 z');
     alifarfalla.append("path").attr("d", 'M 145 121 L 220 75 L 195 130 z');

     
     
     corpofarfalla.append('circle')
         .attr('r', 9)
         .attr('fill','#98a3ad')
         .attr('cx',  135)
         .attr('cy',  158);
     
     corpofarfalla.append('circle')
         .attr('r', 12)
         .attr('fill','#98a3ad')
         .attr('cx', 135)
         .attr('cy', 143);
     
     
     corpofarfalla.append('circle')
         .attr('r', 12)
         .attr('fill','#98a3ad')
         .attr('cx', 135)
         .attr('cy', 128);
     
     
     corpofarfalla.append('circle')
        .attr('r', 15)
        .attr('fill','#98a3ad')
        .attr('cx', 135)
        .attr('cy', 110);
     
     corpofarfalla.append('line')
         .attr('x1',135)
         .attr('y1',  95)
         .attr('x2', 130)
         .attr('y2',  83)
         .attr('stroke','black');
     
     
     corpofarfalla.append('line')
         .attr('x1', 137)
         .attr('y1', 95)
         .attr('x2', 142)
         .attr('y2',83)
         .attr('stroke','black');
     
     corpofarfalla.append('circle')
         .attr('r', 3)
         .attr('fill','black')
         .attr('cx', 142)
         .attr('cy', 83);
     
     
     corpofarfalla.append('circle')
         .attr('r', 3)
         .attr('fill','black')
         .attr('cx', 130)
         .attr('cy', 83)
     
    corpofarfalla.append('circle')
         .attr('r', 3)
         .attr('fill','black')
         .attr('cx', 132)
         .attr('cy', 105);
     
     
    corpofarfalla.append('circle')
         .attr('r', 3)
         .attr('fill','black')
         .attr('cx', 138)
         .attr('cy', 105);

    
}


function disegnoBruco(group){
    
    group.append('circle')
       .attr('r', 10)
       .attr('fill','#4cc267')
       .attr('cx', 135)
       .attr('cy', 110);
         
       

     group.append('circle')
       .attr('r', 15)
       .attr('fill','#4cc267')
       .attr('cx',150)
       .attr('cy', 103);
      
       
    group.append('circle')
       .attr('r', 18)
       .attr('fill','#4cc267')
       .attr('cx',160)
       .attr('cy', 95);
       
       
    group.append('circle')
       .attr('r', 18)
       .attr('fill','#4cc267')
       .attr('cx', 177)
       .attr('cy', 85);
       

    group.append('circle')
       .attr('r', 18)
       .attr('fill','#4cc267')
       .attr('cx',192)
       .attr('cy',86);
       

    group.append('circle')
       .attr('r', 19)
       .attr('fill','#4cc267')
       .attr('cx', 208)
       .attr('cy', 98);
       

    group.append('circle')
       .attr('r', 23)
       .attr('fill','#4cc267')
       .attr('cx',234)
       .attr('cy',100);
       

    group.append('circle')
       .attr('r', 3)
       .attr('fill','black')
       .attr('cx', 242)
       .attr('cy',92);
       

    group.append('line')
       .attr('x1', 232)
       .attr('y1', 85)
       .attr('x2', 237)
       .attr('y2', 65)
       .attr('stroke','#75c888');
       

    group.append('line')
       .attr('x1', 242)
       .attr('y1', 80)
       .attr('x2', 246)
       .attr('y2', 65)
       .attr('stroke','#75c888');
       

    group.append('circle')
       .attr('r', 3)
       .attr('fill','#75c888')
       .attr('cx', 246)
       .attr('cy',  65);
      

    group.append('circle')
       .attr('r', 3)
       .attr('fill','#75c888')
       .attr('cx', 237)
       .attr('cy',65);
       
       
}


