import { useState } from "react";


function Measurements(){
const [data, setData] = useState();

const fetchData = async () => {
        const response = await fetch("/api/measurements");
        const json = await response.json(); 
        setData(json);
        return json ;
     }
// return(

// <section>
// <h1>Measurement</h1>
// <pre>
// {data && JSON.stringify(data, null, 2)}
// </pre>
// <button onClick={fetchMeasurements}> Click to get Data</button>
// </section>

// )
 }

export default Measurements;