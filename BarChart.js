import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const BarChart = () => {
  const chartRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/tutorials/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      console.log(data)
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      // D3 code to create the bar chart using the fetched data
      const svg = d3.select(chartRef.current);

      // Set the dimensions of the chart
      const width = 500;
      const height = 400;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      // Create scales for x and y axes
      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.region))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.intensity)])
        .range([height - margin.bottom, margin.top]);

      // Create x and y axes
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      // Append x and y axes to the chart
      svg
        .append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(xAxis);

      svg
        .append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(yAxis);

      // Create bars
      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d) => xScale(d.region))
        .attr('y', (d) => yScale(d.intensity))
        .attr('width', xScale.bandwidth())
        .attr('height', (d) => height - margin.bottom - yScale(d.intensity))
        .attr('fill', 'steelblue');
    }
  }, [data]);

  return <div className="chart-container" style={{ width: "500px", height: "400px" }}><svg ref={chartRef}></svg></div>;

};

export default BarChart;
