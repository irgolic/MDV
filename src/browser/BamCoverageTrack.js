import {BamFeatureReader} from "./bam.js";
import {MLVTrack} from "./tracks.js";

class BamSCATrack extends MLVTrack{

    constructor(config){
        super(config);
        this.catNumbers={};
        this.config.scale= this.config.scale || 0.1;
        if (!this.config.tag){
            this.config.tag="CB";
        }
        

        this.feature_source= new BamFeatureReader(this.config);
    }
    addIndex(index){
        this.feature_source.catIndex=index;
    }

    getIdsInRange(range){
        return this.feature_source.getIdsInRange(range);
    }

    filterReads(filter,localFilter){
        this.feature_source.setFilter(filter,localFilter);
        this.feature_source.calculateCategories();
    }
    
    /**
    * sets the categories with
    * @param {Uint8Array} data The array holding the data
    * @param {Array} names a list of names  
    * @param {Arrau} colors an array of colors
    */
    setCategories(col,data,names,colors,calculate=false){
        //work out the number of cells in each category if
        //not already calculated - needed for average reads per cell
        if (col == null){
            this.feature_source.setCategories(null,null);
        }
        if (!this.catNumbers[col]){
            const arr = new Array(names.length).fill(0);
            for(let i=0;i<data.length;i++){
                arr[data[i]]++
            }
            this.catNumbers[col]=arr;
            
        }
        this.numbers = this.catNumbers[col];      
        this.feature_source.setCategories(data,names);
        this.catColors=colors;
        this.catNames=names;
        if (calculate){
            this.feature_source.calculateCategories();
        }
    }
    

    async getFeatures(chr,bpStart,bpEnd,force,data){
        if (bpEnd-bpStart>10000000){
            return "zoom in to see coverage";
        }
        try{
            const features = await this.feature_source.getAlignments(chr,bpStart,bpEnd);
            return features;
        }catch(error){
            return error.message;
        }
       
    }

    drawScale(height,ctx){
        let top=this.top;
        const ind_track_height=Math.round(this.config.height/this.catNames.length);
        for (let name of this.catNames){
            let bot = top+ind_track_height;
            ctx.beginPath();
            ctx.moveTo(0,top);
            ctx.lineTo(0,bot);
            ctx.moveTo(0,top);
            ctx.lineTo(20,top);
            ctx.moveTo(0,bot);
            ctx.lineTo(20,bot);
            ctx.font="12px Arial";
            ctx.stroke();
            ctx.textBaseline="top";
            ctx.fillStyle="currentColor";
            let num = this.config.scale     
            ctx.fillText(num.toFixed(2),20,top);
            ctx.font="14px Arial";
            ctx.textBaseline="middle";
            ctx.fillText(name,2,top+(ind_track_height/2));
            ctx.font="12px Arial";
            top+=ind_track_height;
        }
     }

    drawFeatures(options){     
        //experimental
        this.numbers = [1,1,1]     
        //this.feature_source.setCategories(data,names);
        this.catColors=["red","green","blue"];
        

        
        var feature = options.features,
        ctx = options.context,
        bpPerPixel = options.bpPerPixel,
        bpStart = options.bpStart,
        pixelWidth = options.pixelWidth,h,y,x;        
        //bpEnd = bpStart + pixelWidth * bpPerPixel + 1;

        const st = bpStart-feature.store[1];
        const en = st+ (pixelWidth * bpPerPixel) + 1;
        const ind_track_height=Math.round(this.config.height/feature.length);
        let max=800;//this.config.scale;

        let top = options.top;
        this.top=options.top;
		let w = Math.max(1, Math.ceil(1.0 / bpPerPixel));
        let step = bpPerPixel>5?5:1;
        for (let n=0;n<feature.length;n++){
                let arr = feature[n];
                
                ctx.fillStyle=this.catColors[n];
					
					for (let i = st; i < en; i+=step) {

						let bp = i+feature.store[1];
                        if (arr[i]===-0){
                           continue;
                        }
						h = Math.round((((arr[i]/this.numbers[n])) / max) * ind_track_height);
                        h=h>ind_track_height?ind_track_height:h;
						y = ind_track_height - h;
						x = Math.floor((bp - bpStart) / bpPerPixel);
						ctx.fillRect( x, y+top, w, h);
				    }
                top += ind_track_height;  
            }		
    }

    
    getSettings(panel){
        const s= super.getSettings(panel)
        return s.concat([{
            type:"slider",
            min:0,
            max:300,
            step:1,
            label:"Fragment Size",
            current_value:this.feature_source.fragmentThreshold,
            func:x=>{
                this.feature_source.fragmentThreshold=x;
                this.catNames=[
                    "< "+x,
                    "> "+x,
                    "All"
                ]
                this.feature_source.calculateFragmentSize();
                panel.update()

            }
        }]);
    }
}

MLVTrack.track_types["bam_sca_track"]={
	"class":BamSCATrack,
	name:"BAM SCA Track"

}

export default BamSCATrack