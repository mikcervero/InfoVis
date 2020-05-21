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

const bruchi= margingroup.append('g').attr('class', 'bruco')
const farfalle= margingroup.append('g').attr('class', 'farfalla')

d3.json('../data/bruchi.json').then( data => {
    
    const y = d3.scaleLinear()
    .domain([0,d3.max(data,d=> d.spver) + 100 + 23])
              .range([0,Sheight]);
             
    const x = d3.scaleLinear()
             .domain([0,d3.max(data,d=> d.spor) + 246 + 23])
             .range([0,Swidth]);

    

    const bruco= bruchi.selectAll('g')
              .data(data)
              
    

    const group = bruco.enter().append('g').attr('class', 'bruco')
    
         
    
       
  
    //bruco

  group.append('circle')
    .attr('r', 10)
    .attr('fill','#4cc267')
    .attr('cx', d => x(d.spor + 135))
    .attr('cy', d => y(d.spver + 110));


  group.append('circle')
    .attr('r', 15)
    .attr('fill','#4cc267')
    .attr('cx', d => x(d.spor + 150))
    .attr('cy', d => y(d.spver + 103));
   
    
 group.append('circle')
    .attr('r', 18)
    .attr('fill','#4cc267')
    .attr('cx',d => x(d.spor + 160))
    .attr('cy',d => y(d.spver + 95));
    
    
 group.append('circle')
    .attr('r', 18)
    .attr('fill','#4cc267')
    .attr('cx', d => x(d.spor + 177))
    .attr('cy', d => y(d.spver + 85));
    

 group.append('circle')
    .attr('r', 18)
    .attr('fill','#4cc267')
    .attr('cx',d => x(d.spor + 192))
    .attr('cy',d => y(d.spver +  86));
    

 group.append('circle')
    .attr('r', 19)
    .attr('fill','#4cc267')
    .attr('cx', d => x(d.spor + 208))
    .attr('cy', d => y(d.spver + 98));
    

 group.append('circle')
    .attr('r', 23)
    .attr('fill','#4cc267')
    .attr('cx',d => x(d.spor + 234))
    .attr('cy',d => y(d.spver +  100));
    

 group.append('circle')
    .attr('r', 3)
    .attr('fill','black')
    .attr('cx',d => x(d.spor + 242))
    .attr('cy',d => y(d.spver +  92));
    

 group.append('line')
    .attr('x1',d => x(d.spor +  232))
    .attr('y1',  d => y(d.spver + 85))
    .attr('x2', d => x(d.spor + 237))
    .attr('y2',  d => y(d.spver +  65))
    .attr('stroke','#75c888');
    

 group.append('line')
    .attr('x1', d => x(d.spor + 242))
    .attr('y1', d => y(d.spver +  80))
    .attr('x2', d => x(d.spor + 246))
    .attr('y2',d => y(d.spver +  65))
    .attr('stroke','#75c888');
    

 group.append('circle')
    .attr('r', 3)
    .attr('fill','#75c888')
    .attr('cx', d => x(d.spor + 246))
    .attr('cy', d => y(d.spver +  65));
   

 group.append('circle')
    .attr('r', 3)
    .attr('fill','#75c888')
    .attr('cx', d => x(d.spor + 237))
    .attr('cy', d => y(d.spver +  65))
    
    
   //add event
    
    margingroup.selectAll('g')
     .on('click', handleClick);
    
    
});
