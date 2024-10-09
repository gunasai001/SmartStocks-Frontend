import React, { useMemo, useRef, useEffect } from 'react';
import { HistoricalPrice } from '../../types';
import * as d3 from 'd3';

interface Props {
  data: HistoricalPrice[] | undefined;
}

const StockChart: React.FC<Props> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const fixedAxisRef = useRef<SVGSVGElement>(null);

  const chartData = useMemo(() => {
    return data?.map(point => ({
      date: new Date(point.date),
      open: point.open,
      close: point.close,
      high: point.high,
      low: point.low,
    }));
  }, [data]);

  useEffect(() => {
    if (!svgRef.current || !fixedAxisRef.current) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 0 };
    const width = 1000 - margin.left - margin.right; // Fixed width
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(chartData.map(d => d.date.toISOString()))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([d3.min(chartData, d => d.low) as number, d3.max(chartData, d => d.high) as number])
      .range([height, 0]);

    // Add X axis
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x)
        .tickFormat((d, i) => i % 20 === 0 ? d3.timeFormat('%b %d')(new Date(d)) : '')
        .tickSize(0)
      )
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    // Add candlesticks
    g.selectAll('.candlestick')
      .data(chartData)
      .enter()
      .append('g')
      .attr('class', 'candlestick')
      .each(function(d) {
        const g = d3.select(this);
        const color = d.open > d.close ? 'red' : 'green';
        
        // Draw the wick
        g.append('line')
          .attr('x1', () => (x(d.date.toISOString()) as number) + x.bandwidth() / 2)
          .attr('x2', () => (x(d.date.toISOString()) as number) + x.bandwidth() / 2)
          .attr('y1', () => y(d.low))
          .attr('y2', () => y(d.high))
          .attr('stroke', color);

        // Draw the body
        g.append('rect')
          .attr('x', () => x(d.date.toISOString()) as number)
          .attr('y', () => y(Math.max(d.open, d.close)))
          .attr('width', x.bandwidth())
          .attr('height', () => Math.abs(y(d.open) - y(d.close)))
          .attr('fill', color);
      });

    // Create a fixed Y axis
    const fixedAxisSvg = d3.select(fixedAxisRef.current)
      .attr('width', 60)
      .attr('height', height + margin.top + margin.bottom);

    fixedAxisSvg.selectAll('*').remove();

    const fixedAxisG = fixedAxisSvg.append('g')
      .attr('transform', `translate(60,${margin.top})`);

    fixedAxisG.call(d3.axisLeft(y));
    fixedAxisSvg.append('line')
      .attr('x1', 60)
      .attr('x2', 60)
      .attr('y1', margin.top)
      .attr('y2', height + margin.top)
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1);

  }, [chartData]);

  return (
    <div className='w-full'  style={{ display: 'flex', height: '500px' }}>
      <svg ref={fixedAxisRef} style={{ overflow: 'visible' }} />
      <svg ref={svgRef} />
    </div>
  );
};

export default StockChart;