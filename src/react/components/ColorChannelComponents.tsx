import { action } from "mobx";
import { useOmeTiff } from "../hooks";
import { VivMDVReact } from "./VivMDVReact";
import { observer } from "mobx-react-lite";
import { useChart } from "../context";
import { ChannelsState } from "../viv_state";


// this should have enough context to know what channels are available...
// and I really want to refactor so that I'm not passing the parent like this
// in a way that is too specifically tied to VivMDVReact...
export default observer(function MainVivColorDialog() {
    const parent = useChart() as VivMDVReact;
    if (parent.config.type === 'VivMdvRegionReact') {
        return <div>Color channel selection not available for region views.</div>
    }
    else if (parent.config.type !== 'VivMdvReact') throw new Error('unexpected config type');
    // unfortunate to have another loader here - totally separate React root...
    const ome = useOmeTiff(); 
    if (!ome) return <div>loading...</div>;
    return (
    <div>
        Name: {ome.metadata.Name}
        <ChannelSelect />
    </div>
    )
})


const ChannelSelect = observer(() => {
    const { config } = useChart() as VivMDVReact;
    if (config.type === 'VivMdvRegionReact') {
        return <div>Color channel selection not available for region views.</div>
    }
    else if (config.type !== 'VivMdvReact') throw new Error('unexpected config type');
    const ome = useOmeTiff();
    if (!ome) return <div>loading...</div>;
    const channelOptions = ome.metadata.Pixels.Channels.map((c, i) => (
        <option key={c.ID} value={i}>{c.Name}</option>
    ));
    return (
    <div>
        <select value={config.channel} onChange={
            action(e => config.channel = Number.parseInt(e.target.value))}>
            {channelOptions}
        </select>
    </div>
    )
});

function ChannelContrastEditor({channelsState, channel}: {channelsState: ChannelsState, channel: number}) {
    const [min, max] = channelsState.contrastLimits[channel];
    // I think I'd rather have an array of channels objects, rather than arrays for each...
    // number of channels is small, after all...
    const color = channelsState.colors[channel];
    return (
        <div>
            <input type="number" value={min} onChange={action(e => channelsState.contrastLimits[channel][0] = Number.parseFloat(e.target.value))} />
            <input type="number" value={max} onChange={action(e => channelsState.contrastLimits[channel][1] = Number.parseFloat(e.target.value))} />
        </div>
    )

}