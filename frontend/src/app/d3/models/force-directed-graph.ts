// path : d3/models/force-directed-graph.ts

import { EventEmitter } from '@angular/core';
import { Link } from './link';
import { Node } from './node';
import * as d3 from 'd3';

const FORCES = {
    LINKS: 1,
    COLLISION: 0,
    CHARGE: 250
}

export class ForceDirectedGraph {
    public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
    public simulation: d3.Simulation<any, any>;

    public nodes: Node[] = [];
    public links: Link[] = [];


    constructor(nodes, links, options: { width, height }) {
        this.nodes = nodes;
        this.links = links;
        this.initSimulation(options);
    }


    initNodes() {
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet');
        }

        this.simulation.nodes(this.nodes);
    }

    initLinks() {
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet');
        }

        // Initializing the links force simulation
        this.simulation.force('links',
            d3.forceLink(this.links)
                .strength(FORCES.LINKS)
        );
    }

    initSimulation(options) {
        if (!options || !options.width || !options.height) {
            throw new Error('missing options when initializing simulation');
        }

        /** Creating the simulation */
        if (!this.simulation) {
            const ticker = this.ticker;

            // Creating the force simulation and defining the charges
            this.simulation = d3.forceSimulation()
            .force('charge',
                d3.forceManyBody()
                    .strength(FORCES.CHARGE)
            );

            // Connecting the d3 ticker to an angular event emitter
            this.simulation.on('tick', function () {
                ticker.emit(this);
            });

            this.initNodes();
            this.initLinks();
        }

        /** Updating the central force of the simulation */
        this.simulation.force('centers', d3.forceCenter(options.width / 2, options.height / 2));
        this.simulation.force('charge', d3.forceCollide(150));
        /** Restarting the simulation internal timer */
        this.simulation.restart();
    }


    // drag groups
    // group_dragstarted(groupId) {
    //   if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    //   d3.select(this).select('path').style('stroke-width', 3);
    // }

    // group_dragged(groupId) {
    //   this.nodes
    //     .filter(function(d) { return d.group == groupId; })
    //     .forEach(function(d) {
    //       d.x += d3.event.dx;
    //       d.y += d3.event.dy;
    //     })
    // }

    // group_dragended(groupId) {
    //   if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    //   d3.select(this).select('path').style('stroke-width', 1);
    // }
}
