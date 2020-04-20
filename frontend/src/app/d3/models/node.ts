import APP_CONFIG from '../../gen-z-mapping/gen-z-mapping.config';

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  // holds the url for data lookup
  url?: any;

  // holds the type of Entity (used for coloring/shape)
  type?: string;

  id: string;

  // used for emphasis
  linkCount: number = 10;

  constructor(id) {
    this.id = id;
  }

  normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  }

  get r() {
    return 50 * this.normal() + 50;
  }

  get fontSize() {
    return (30 * this.normal() + 10) + 'px';
  }

  get color() {

    let color_palette = APP_CONFIG.SPECTRUM_BLUE;

    if(this.type=='Endpoint'){
      color_palette = APP_CONFIG.SPECTRUM_ORANGE;
    }
    if(this.type=='Switch'){
      color_palette = APP_CONFIG.SPECTRUM_GREEN;
    }
    if(this.type=='Adapter'){
      color_palette = APP_CONFIG.SPECTRUM_RED;
    }

    let index = Math.floor(color_palette.length * this.normal());
    return color_palette[index];
  }

}
