const svg = d3.select('body')
    .append ('svg')
    .attr('width',1400)
    .attr('height',900)
    

//create margins and dimension
const margin= {top:20, right:20, bottom: 20, left:30};
const Swidth = 1400 - margin.left - margin.right;
const Sheight = 900 - margin.top - margin.bottom;

// per i valori vedere le funzioni disegnobruco e disegnofarfalla
const YmaxBruco= 100+23;  // 100 rappresenta il valore maggiore per la coordinata y inserita nel disegno, essendo la cordinata del centro di un cerchio bisogna
                         //aggiungere il raggio (23)
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
      
      const color= '#c6f0cf'

      const backgroundBruchi= createBackground(color);
        
      const bruchi= svg.append('g')
         .attr('class', 'bruchi')
         .attr('width',Swidth)
         .attr('height',Sheight)
         .attr('transform', 'translate('+ margin.left +','+ margin.top + ')');
      
      //const animale= bruchi
          
       
      //altezza effettiva del bruco
      const brucoHeigth = YmaxBruco-YminBruco
      
      
      const y = d3.scaleLinear()
               .domain([0,d3.max(data,d=> d.spver) + YmaxBruco])
               .range([0,Sheight-brucoHeigth]);
      
      //lunghezza effettiva del bruco
      const brucoWidth = XmaxBruco-XminBruco
      
      const x = d3.scaleLinear()
               .domain([0,d3.max(data,d=> d.spor) + XmaxBruco])
               .range([0,Swidth-brucoWidth]);
  
      
      const bruco= bruchi.selectAll('.bruchi')
               .data(data)
             
  
      const group = bruco.enter().append('g')
           .attr('id',d=>'bruco'+ d.name)
           .attr('class', 'bruco')
           .attr('stroke', 'black')
           .attr('transform', function(d) { return "translate(" + x(d.spor-50) + "," + y(d.spver+40) + ")"; });
           
       //disegno l'immagine di un bruco
      disegnoBruco(group);
        
      if (richiesta==1){
         
          svg.selectAll('.bruco').on('click', function(d,i,n){

            d3.select(n[i]);

                
            svg.selectAll('.corpobruco1').transition().duration(1500).attr("transform", "translate(-30,120) rotate(-40)").attr('fill', '#adcdf0').attr('r', 0)
            svg.selectAll('.corpobruco2').transition().duration(1500).attr("transform", "translate(-30,120) rotate(-40)").attr('fill', '#adcdf0').attr('r', 0)
            svg.selectAll('.corpobruco3').transition().duration(1500).attr("transform", "translate(-30,120) rotate(-40)").attr('fill', '#adcdf0').attr('r', 0)
            svg.selectAll('.corpobruco4').transition().duration(1500).attr("transform", "translate(-30,120) rotate(-40)").attr('fill', '#adcdf0').attr('r', 0)
            svg.selectAll('.corpobruco5').transition().duration(1500).attr("transform", "translate(-30,120) rotate(-40)").attr('fill', '#adcdf0').attr('r', 0)
            svg.selectAll('.corpobruco6').transition().duration(1500).attr("transform", "translate(-30,120) rotate(-40)").attr('r', 0)
            svg.selectAll('.antenna1bruco').transition().duration(500).attr('y2',85).attr('x2', 232)
            svg.selectAll('.antenna2bruco').transition().duration(500).attr('y2',80).attr('x2', 242)
     
            svg.select(".background").transition().duration(1000).attr('fill', '#adcdf0');
            

            createFarfalle();
 
          });
        
        }
  
    });
  
  }



  function createFarfalle(){
  
    const farfalle= svg.append('g')
       .attr('class', 'farfalle')
       .attr('width',Swidth)
       .attr('height',Sheight)
       .attr('transform', 'translate('+ margin.left +','+ margin.top + ')')
    
    
    const animale= farfalle
    
    const color= '#adcdf0'

    
    d3.json('../data/configuration.json').then( data => {
        
     
     const farfallaHeigth = YmaxFarfalla-YminFarfalla;

     const farfallaWidth = XmaxFarfalla-XminFarfalla

     const y = d3.scaleLinear()
      .range([0,Sheight-farfallaHeigth]);

     const x = d3.scaleLinear()
      .range([0,Swidth-farfallaWidth]);
        
     // inizializzo un contatore
     var count=0;
     
      // inizializzazione, prima configurazione
       XScaleDomain(data[0],x);
       YScaleDomain(data[0],y);
       project(data[0],x,y,count,data);

     
    });

    
}

function project(data,x,y,count,allData){
   
    count=0;
 
    var spostamenti = data["spostamenti"];
 
    const farfalla= svg.selectAll('.farfalle').selectAll('g')
           .data(spostamenti,function(d){return d.farfalla});
 
 
    const group2 = farfalla.enter().append('g').attr('id',d=>'butterfly'+ d.farfalla).attr('class', 'farfallaConfig').attr('transform', function(d) { return "translate(" + x(d.spor) + "," + y(d.spver) + ")"; });
 
 
    const alifarfalla= group2.append('g').attr('fill',d=> d.ali).attr('stroke',d=> d.contorno).attr("stroke-width", 2);
 
    const corpofarfalla= group2.append('g').attr('stroke', 'black');
    
     disegnoFarfalla(alifarfalla,corpofarfalla);

     svg.selectAll('.ultimapalla').transition().duration(2500).attr('r', 9)
     svg.selectAll('.secondapalla').transition().duration(2500).attr('r', 12)
     svg.selectAll('.testa').transition().duration(2500).attr('r', 15)
     svg.selectAll('.cerchipiccoli').transition().duration(2500).attr('r', 3)
     svg.selectAll('.antenna1').transition().duration(2500).attr('y2',83).attr('x2', 130)
     svg.selectAll('.antenna2').transition().duration(2500).attr('y2',83).attr('x2', 142)
     svg.selectAll('.ala1').transition().duration(2500).attr("d", 'M 125 121 L 50 75 L 74 130 z');
     svg.selectAll('.ala2').transition().duration(2500).attr("d", 'M 125 121 L 85 130 L 90 190 z');
     svg.selectAll('.ala3').transition().duration(2500).attr("d", 'M 145 121 L 185 130 L 180 190 z');
     svg.selectAll('.ala4').transition().duration(2500).attr("d", 'M 145 121 L 220 75 L 195 130 z');
    
 
         for (i =0; i<10 ;i++) {
         
         XScaleDomain(allData[count+1],x);
         YScaleDomain(allData[count+1],y);
         
         svg.selectAll('#butterfly'+allData[count]["spostamenti"][i].farfalla).transition().duration(6000).attr('transform',function(d) { return "translate(" + x((allData[count+1]["spostamenti"][i]).spor) + "," + y((allData[count+1]["spostamenti"][i]).spver) + ")"; });
         
         prossimeConfigurazioni(allData[count+1],x,y,count+1,allData);
 
         }


    
    //  svg.selectAll('.farfallaConfig').on('click', function(d,i,n){
    
    //      d3.select(n[i]);
 
    //      for (i =0; i<10 ;i++) {
         
    //      XScaleDomain(allData[count+1],x);
    //      YScaleDomain(allData[count+1],y);
         
    //      svg.selectAll('#butterfly'+allData[count]["spostamenti"][i].farfalla).transition().duration(2000).attr('transform',function(d) { return "translate(" + x((allData[count+1]["spostamenti"][i]).spor) + "," + y((allData[count+1]["spostamenti"][i]).spver) + ")"; });
         
    //      prossimeConfigurazioni(allData[count+1],x,y,count+1,allData);

        
    //      }


    //     });  

    }

  
function prossimeConfigurazioni(data,x,y,count,allData){

    svg.selectAll('.farfallaConfig').on('click', function(d,i,n){
    
        d3.select(n[i]);

        if (count<6){

          for (i =0; i<10 ;i++) {
        
            XScaleDomain(allData[count+1],x);
            YScaleDomain(allData[count+1],y);

            svg.selectAll('#butterfly'+allData[count]["spostamenti"][i].farfalla).transition().duration(3000).attr('transform',function(d) { return "translate(" + x((allData[count+1]["spostamenti"][i]).spor) + "," + y((allData[count+1]["spostamenti"][i]).spver) + ")"; });

            prossimeConfigurazioni(allData[count+1],x,y,count+1,allData);


        }

      }

      else {
        
        
        for (i =0; i<10 ;i++) {
        
          XScaleDomain(allData[0],x);
          YScaleDomain(allData[0],y);

          svg.selectAll('#butterfly'+allData[count]["spostamenti"][i].farfalla).transition().duration(3000).attr('transform',function(d) { return "translate(" + x((allData[0]["spostamenti"][i]).spor) + "," + y((allData[0]["spostamenti"][i]).spver) + ")"; });


      }
       
       
       
        svg.select(".background").transition().duration(5000).attr('fill', '#c6f0cf');
      //  svg.selectAll('.bruco').transition().delay(3000).remove()
      
     
       svg.selectAll('.ultimapalla').transition().delay(3000).duration(2500).attr('r', 0);
       svg.selectAll('.secondapalla').transition().delay(3000).duration(2500).attr('r', 0);
       svg.selectAll('.testa').transition().delay(3000).duration(2500).attr('r', 0);
       svg.selectAll('.cerchipiccoli').transition().delay(3000).duration(2500).attr('r', 0);
       svg.selectAll('.antenna1').transition().delay(3000).duration(2500).attr('y2',95).attr('x2', 135);
       svg.selectAll('.antenna2').transition().delay(3000).duration(2500).attr('y2',95).attr('x2', 137);
       svg.selectAll('.ala1').transition().delay(3000).duration(2500).attr("d", 'M 125 121 L 125 121 L 125 121 z');
       svg.selectAll('.ala2').transition().delay(3000).duration(2500).attr("d", 'M 125 121 L 125 121 L 125 121 z');
       svg.selectAll('.ala3').transition().delay(3000).duration(2500).attr("d", 'M 145 121 L 145 121 L 145 121 z');
       svg.selectAll('.ala4').transition().delay(3000).duration(2500).attr("d", 'M 145 121 L 145 121 L 145 121 z');

       svg.selectAll('.corpobruco1').transition().delay(3000).duration(2500).attr('fill', '#4cc267').attr('r', 10).attr("transform", "rotate(+0) translate(0,+0)");
       svg.selectAll('.corpobruco2').transition().delay(3000).duration(2500).attr('fill', '#4cc267').attr('r', 15).attr("transform", "rotate(+0) translate(0,+0)");
       svg.selectAll('.corpobruco3').transition().delay(3000).duration(2500).attr('fill', '#4cc267').attr('r', 18).attr("transform", "rotate(+0) translate(0,+0)");
       svg.selectAll('.corpobruco4').transition().delay(3000).duration(2500).attr('fill', '#4cc267').attr('r', 19).attr("transform", "rotate(+0) translate(0,+0)");
       svg.selectAll('.corpobruco5').transition().delay(3000).duration(2500).attr('fill', '#4cc267').attr('r', 23).attr("transform", "rotate(+0) translate(0,+0)");
       svg.selectAll('.corpobruco6').transition().delay(3000).duration(2500).attr('r', 3).attr("transform", "rotate(0) translate(0,0)");
       svg.selectAll('.antenna1bruco').transition().delay(3000).duration(1000).attr('y2',65).attr('x2', 237);
       svg.selectAll('.antenna2bruco').transition().delay(3000).duration(1000).attr('y2',65).attr('x2', 246);
     
       svg.selectAll('.farfallaConfig').transition().delay(5000).remove()
        
       }


       });  

       }


  function XScaleDomain(data,x) {

    var spostamenti = data["spostamenti"];

    x.domain([0, d3.max(spostamenti, function(d) { return d.spor; })+ XmaxFarfalla]);

}


function YScaleDomain(data,y){
    
    var spostamenti = data["spostamenti"];
    
    y.domain([0, d3.max(spostamenti, function(d) { return d.spver; })+YmaxFarfalla]);
    
}

  
  function createBackground(color){
    svg.append('rect')
           .attr('width',Swidth)
           .attr('height',Sheight)
           .attr('class', 'background')
           .attr('transform', 'translate('+ margin.left +','+ margin.top + ')')
           .attr('fill',color);
    
}


function disegnoFarfalla(alifarfalla,corpofarfalla){
    
    
     //alifarfalla.append("path").attr("d", 'M 125 121 L 50 75 L 74 130 z');
     //alifarfalla.append("path").attr("d", 'M 125 121 L 85 130 L 90 190 z');
     //alifarfalla.append("path").attr("d", 'M 145 121 L 185 130 L 180 190 z');
     // alifarfalla.append("path").attr("d", 'M 145 121 L 220 75 L 195 130 z');

     alifarfalla.append("path").attr("d", 'M 125 121 L 125 121 L 125 121 z').attr('class','ala1');
     alifarfalla.append("path").attr("d", 'M 125 121 L 125 121 L 125 121 z').attr('class','ala2');
    
     alifarfalla.append("path").attr("d", 'M 145 121 L 145 121 L 145 121 z').attr('class','ala3');
     alifarfalla.append("path").attr("d", 'M 145 121 L 145 121 L 145 121 z').attr('class','ala4');

     
     
     corpofarfalla.append('circle')
         .attr('class','ultimapalla')
         .attr('r', 0)
         .attr('fill','#98a3ad')
         .attr('cx',  135)
         .attr('cy',  158);
     
     corpofarfalla.append('circle')
         .attr('class','secondapalla')
         .attr('r', 0)
         .attr('fill','#98a3ad')
         .attr('cx', 135)
         .attr('cy', 143);
     
     
     corpofarfalla.append('circle')
         .attr('class','secondapalla')
         .attr('r', 0)
         .attr('fill','#98a3ad')
         .attr('cx', 135)
         .attr('cy', 128);
     
     
     corpofarfalla.append('circle')
        .attr('class','testa')
        .attr('r', 0)
        .attr('fill','#98a3ad')
        .attr('cx', 135)
        .attr('cy', 110);
     
     corpofarfalla.append('line')
         .attr('class','antenna1')
         .attr('x1',135)
         .attr('y1',  95)
         .attr('x2', 135)
         .attr('y2',95)
         .attr('stroke','black');
     
     
     corpofarfalla.append('line')
         .attr('class','antenna2')
         .attr('x1', 137)
         .attr('y1', 95)
         .attr('x2', 137)
         .attr('y2',95)
         .attr('stroke','black');
     
     corpofarfalla.append('circle')
         .attr('class','cerchipiccoli')
         .attr('r', 0)
         .attr('fill','black')
         .attr('cx', 142)
         .attr('cy', 83);
     
     
     corpofarfalla.append('circle')
         .attr('class','cerchipiccoli')
         .attr('r', 0)
         .attr('fill','black')
         .attr('cx', 130)
         .attr('cy', 83)
     
    corpofarfalla.append('circle')
         .attr('class','cerchipiccoli')
         .attr('r', 0)
         .attr('fill','black')
         .attr('cx', 132)
         .attr('cy', 105);
     
     
    corpofarfalla.append('circle')
         .attr('class','cerchipiccoli')
         .attr('r', 0)
         .attr('fill','black')
         .attr('cx', 138)
         .attr('cy', 105);

    
}


function disegnoBruco(group){
    
    group.append('circle')
       .attr('class', 'corpobruco1')
       .attr('r', 10)
       .attr('fill','#4cc267')
       .attr('cx', 135)
       .attr('cy', 110);
         
       

     group.append('circle')
       .attr('class', 'corpobruco2')
       .attr('r', 15)
       .attr('fill','#4cc267')
       .attr('cx',150)
       .attr('cy', 103);
      
       
    group.append('circle')
       .attr('class', 'corpobruco3')
       .attr('r', 18)
       .attr('fill','#4cc267')
       .attr('cx',160)
       .attr('cy', 95);
       
       
    group.append('circle')
       .attr('class', 'corpobruco3')
       .attr('r', 18)
       .attr('fill','#4cc267')
       .attr('cx', 177)
       .attr('cy', 85);
       

    group.append('circle')
       .attr('class', 'corpobruco3')
       .attr('r', 18)
       .attr('fill','#4cc267')
       .attr('cx',192)
       .attr('cy',86);
       

    group.append('circle')
       .attr('class', 'corpobruco4')
       .attr('r', 19)
       .attr('fill','#4cc267')
       .attr('cx', 208)
       .attr('cy', 98);
       

    group.append('circle')
       .attr('class', 'corpobruco5')
       .attr('r', 23)
       .attr('fill','#4cc267')
       .attr('cx',234)
       .attr('cy',100);
       

    group.append('circle')
       .attr('class', 'corpobruco6')
       .attr('r', 3)
       .attr('fill','black')
       .attr('cx', 242)
       .attr('cy',92);
       

    group.append('line')
       .attr('class', 'antenna1bruco')
       .attr('x1', 232)
       .attr('y1', 85)
       .attr('x2', 237)
       .attr('y2', 65)
       .attr('stroke','#75c888');
       

    group.append('line')
       .attr('class', 'antenna2bruco')
       .attr('x1', 242)
       .attr('y1', 80)
       .attr('x2', 246)
       .attr('y2', 65)
       .attr('stroke','#75c888');
       

    group.append('circle')
       .attr('class', 'corpobruco6')
       .attr('r', 3)
       .attr('fill','#75c888')
       .attr('cx', 246)
       .attr('cy',  65);
      

    group.append('circle')
       .attr('class', 'corpobruco6')
       .attr('r', 3)
       .attr('fill','#75c888')
       .attr('cx', 237)
       .attr('cy',65);
       
       
}


