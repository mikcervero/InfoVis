
const svg = d3.select('body')
  .append ('svg')
    .attr('width',1360)
    .attr('height',600);
    

//create margins and dimension
const margin= {top:10, right:10, bottom: 10, left:10};
const Swidth = 1360 - margin.left - margin.right;
const Sheight = 600 - margin.bottom - margin.top;

const margingroup= svg.append('g')
          .attr('width',Swidth)
          .attr('height',Sheight)
          .attr('transform', 'translate('+ margin.left +','+ margin.top + ')')
            .style("opacity", 1);

//d3.json('../data/bruchi.json').then( data => {
//
//    const y = d3.scaleLinear()
//    .domain([0,d3.max(data,d=> d.spver) + 100 + 23])
//              .range([0,Sheight]);
//
//    const x = d3.scaleLinear()
//             .domain([0,d3.max(data,d=> d.spor) + 246 + 23])
//             .range([0,Swidth]);
//
//

//    const bruchi= margingroup.selectAll('g')
//              .data(data)
//
//
//
//    const group = bruchi.enter().append('g')
//
         
    
       
  
    //bruco

margingroup.append("path").attr("d", 'M 145 121 L 220 75 L 195 130 z').attr('fill','orange').attr('stroke','black').attr("stroke-width", 2);

margingroup.append("path").attr("d", 'M 145 121 L 185 130 L 180 190 z').attr('fill','orange').attr('stroke','black').attr("stroke-width", 2);

margingroup.append("path").attr("d", 'M 125 121 L 50 75 L 74 130 z').attr('fill','orange').attr('stroke','black').attr("stroke-width", 2);

margingroup.append("path").attr("d", 'M 125 121 L 85 130 L 90 190 z').attr('fill','orange').attr('stroke','black').attr("stroke-width", 2);


  margingroup.append('circle')
    .attr('r', 15)
    .attr('fill','#98a3ad')
    .attr('cx', 135)
    .attr('cy', 110)



  margingroup.append('circle')
    .attr('r', 12)
    .attr('fill','#98a3ad')
    .attr('cx', 135)
    .attr('cy', 128);
   
    
 margingroup.append('circle')
    .attr('r', 12)
    .attr('fill','#98a3ad')
    .attr('cx', 135)
    .attr('cy', 143);
    
    
  margingroup.append('circle')
    .attr('r', 9)
    .attr('fill','#98a3ad')
    .attr('cx',  135)
    .attr('cy',  158);
//
//
// group.append('circle')
//    .attr('r', 18)
//    .attr('fill','#4cc267')
//    .attr('cx',d => x(d.spor + 192))
//    .attr('cy',d => y(d.spver +  86));
//
//
// group.append('circle')
//    .attr('r', 19)
//    .attr('fill','#4cc267')
//    .attr('cx', d => x(d.spor + 208))
//    .attr('cy', d => y(d.spver + 98));
//
//
// group.append('circle')
//    .attr('r', 23)
//    .attr('fill','#4cc267')
//    .attr('cx',d => x(d.spor + 234))
//    .attr('cy',d => y(d.spver +  100));
//
//
// group.append('circle')
//    .attr('r', 3)
//    .attr('fill','black')
//    .attr('cx',d => x(d.spor + 242))
//    .attr('cy',d => y(d.spver +  92));
//
//
 margingroup.append('line')
    .attr('x1',135)
    .attr('y1',  95)
    .attr('x2', 130)
    .attr('y2',  83)
    .attr('stroke','black');


 margingroup.append('line')
    .attr('x1', 137)
    .attr('y1', 95)
    .attr('x2', 142)
    .attr('y2',83)
    .attr('stroke','black');
//
//

margingroup.append('circle')
   .attr('r', 3)
   .attr('fill','black')
   .attr('cx', 142)
   .attr('cy', 83);


margingroup.append('circle')
   .attr('r', 3)
   .attr('fill','black')
   .attr('cx', 130)
   .attr('cy', 83)

 margingroup.append('circle')
    .attr('r', 3)
    .attr('fill','black')
    .attr('cx', 132)
    .attr('cy', 105);


 margingroup.append('circle')
    .attr('r', 3)
    .attr('fill','black')
    .attr('cx', 138)
    .attr('cy', 105);



//.attr('transform', 'rotate(40) scale(0.3) translate(340,10) ').attr('fill','blue')



//
//   //add event
//
//    margingroup.selectAll('g')
//     .on('click', handleClick);
//
//
//});
//
//
//const handleClick = (d,i,n) => {
//    d3.select(n[i])
//    d3.selectAll('g')
//    .transition().duration(300)
//          .remove()
//};


//const xAxisGroup = graph.append('g')
//.attr('transform','translate(0,'+ graphHeight+')');
//const yAxisGroup = graph.append('g');
//
//
//
//const y=d3.scaleLinear()
//.domain([0,d3.max(data, d => d.orders)])
////.range([0,graphHeight]); così ho 1400 sotto e 0 sopra
//.range([graphHeight,0]);
//

// trovo valore minimo e massimo del json
//const min= d3.min(data, d => d.orders);
//const max= d3.max(data, d => d.orders);
//questo ritorna direttamente un array con il minimo e il massimo
//const extent = d3.extent(data, d=> d.orders);
//console.log(min,max,extent);

// per item intendiamo l'intero oggetto name order
// con il .map creiamo un array
//const x = d3.scaleBand()
//.domain(data.map(item => item.name))
//.range([0,500])
//.paddingInner(0.2)
//.paddingOuter(0.2);

//const t= d3.transition().duration(500);
//
//
//const rects= graph.selectAll('rect')
// .data(data)
//
//// modificare qui per l'update dei dati
//
//rects.attr('width',x.bandwidth)
//
//   .attr('fill','orange')
//   .attr('x', d => x(d.name))
////   .transition().duration(500)
////     .attr('height', d => graphHeight-y(d.orders))
////     .attr('y',d=> y(d.orders));
//
//
//
//rects.enter()
//.append('rect')
//.attr('width',x.bandwidth)
////the starting condition
//.attr('height',0)
//.attr('fill','orange')
//.attr('x',d => x(d.name))
//.attr('y',graphHeight)
//.merge(rects)
//.transition(t)
//  .attr('y',d=> y(d.orders))
// //altrimenti essendo 200 in basso l'altezza della barra non era giusta, in questo modo parto da 1400 e arrivo a 1200
//.attr('height', d =>graphHeight-y(d.orders));
//
//// create and call the axes
//
//const xAxis=d3.axisBottom(x);
//const yAxis=d3.axisLeft(y)
////.ticks(3) in questo modo l'asse y è suddiviso solo in 3 valori 500 1000 1500
//.ticks(3)
////mi inserisce a fianco a 500 1000 e 1500 di cosa si tratta
//.tickFormat(d => d+ ' orders');
//xAxisGroup.call(xAxis);
//yAxisGroup.call(yAxis);
//
//xAxisGroup.selectAll('text')
//// se inserisco solo questa riga sotto il testo viene troncato dalle barre
//.attr('transform', 'rotate(-40)')
//.attr('text-anchor', 'end')
//.attr('fill','purple');
//
//
