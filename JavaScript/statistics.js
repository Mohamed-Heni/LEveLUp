
function graph() {
  onload= ()=>{
    let sides = 5; // no. of data points (increment this to add more data)
    let units = 4; // no. of graphs + 1 (increment this to add more graph)
    let vertices = (new Array(units)).fill(""); 
    let percents = new Array(units);
    percents[0] = (new Array(sides)).fill(100); // for the polygon's grid
    // each graph's data points in the order [B, C, D... A] 
    let UserAbil=JSON.parse(localStorage.getItem("UserAbil"));
    console.log(UserAbil)
    percents[1] = [100, 50, 60, 50, 90]; 
    percents[2] = [100, 50, 60, 50, 90];
    percents[3] = [UserAbil["CS"], UserAbil["C"], UserAbil["T"], UserAbil["AF"], UserAbil["CT"]];
    // (add to percents[] to add a new graph's data points)
    let gradient = "conic-gradient(";
    let angle = 360/sides;
    
    /* calculate vertices */
    with(Math){for(i=0,n=2*PI;i<sides;i++,n+=2*PI){
      for(j=0;j<units;j++){
        let x = (round(cos(-1*PI/2 + n/sides) * percents[j][i]) + 100) / 2; 
        let y = (round(sin(-1*PI/2 + n/sides) * percents[j][i]) + 100) / 2; 
        vertices[j] += `${x}% ${y}${i==sides-1 ? '%':'%, '}`;
      }
      gradient += `white ${(angle*(i+1))-1}deg,#ddd ${(angle*(i+1))-1}deg,#ddd ${(angle*(i+1))+1}deg,white ${(angle*(i+1))+1}deg,`;
    }}
    
    /* draw polygons (grids + graphs) */
    document.querySelectorAll('.graphs>div').forEach((graph,i)=>{graph.style.clipPath =`polygon(${vertices[i+1]})`;});
    document.querySelectorAll('.grids>div').forEach((grid,i)=>{grid.style.clipPath =`polygon(${vertices[0]})`;});
    document.querySelector('.grids:nth-of-type(1)>div').style.background =`${gradient.slice(0, -1)})`;
    
    /* position data labels */
    let firstLabel =document.querySelector('.labels:first-of-type');
    // first label is always set in the top middle
    firstLabel.style.insetInlineStart =`calc(50% - ${firstLabel.offsetWidth/2}px)`;
    // setting labels for the rest of the vertices (data points) 
    let v = Array.from(vertices[0].split(' ').splice(0,(2*sides)-2),(n)=>parseInt(n)); 
    document.querySelectorAll('.labels:not(:first-of-type)').forEach((label,i)=>{
      let width =label.offsetWidth/2; 
      let height =label.offsetHeight;
      label.style.insetInlineStart =`calc(${v[i*2]}% + ${v[i*2]<50  ?  -3*width : v[i*2]==50 ? -width:width}px)`;
      label.style.insetBlockStart =`calc(${v[(i*2)+1]}% - ${v[(i*2)+1]==100  ? -height:height/2}px)`;
    });
    }
}
graph();

const testuser={
  Name:"Mohamed",
  familyName:"Heni",
  classId:"0612"

}
