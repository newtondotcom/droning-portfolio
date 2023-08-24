<script lang="ts">
    import {onMount} from "svelte";
    /*
    //S3 link getter
    import {Client} from 'minio';

    const minioClient = new Client({
    endPoint: 'YOUR_ENDPOINT',
    port: 9000, // Change to your MinIO port
    useSSL: false, // Set to true if using SSL
    accessKey: 'YOUR_ACCESS_KEY',
    secretKey: 'YOUR_SECRET_KEY'
    });

    const params = {
    Bucket: 'drone',
    Key: 'your-object-key',
    Expires: 3600 // Link will expire in 1 hour (adjust as needed)
    };

    //const preSignedUrl = minioClient.presignedGetObject(params.Bucket, params.Key, params.Expires);
    //console.log('Pre-signed URL:', preSignedUrl);
    */

    //Streaming
	import {
        Hls,Player, DefaultUi
	} from '@vime/svelte';
    
    import {defineCustomElements} from '@vime/core/loader';
    
//Video,DefaultUi,usePlayerStore,
	// Custom UI component.
	import TapSidesToSeek from './TapSidesToSeek.svelte';
    //import type Player from '@vime/svelte/dist/types/components/Player';

	// Obtain a ref if you need to call any methods.
	//let player: Player;

    const hlsConfig = {
        autoStartLoad: true, // Automatically start loading segments
        startLevel: -1, // Start loading the best quality available
        maxBufferLength: 30, // Maximum buffer length in seconds
        maxMaxBufferLength: 600, // Maximum buffer length in seconds (even if allowMaxBufferLength is enabled)
        maxBufferSize: 60 * 1000 * 1000, // Maximum buffer size in bytes
        maxBufferHole: 0.5, // Maximum buffer hole as a fraction of segment duration
        lowLatencyMode: true, // Enable low-latency mode
        capLevelToPlayerSize: false, // Cap the quality to the player's dimensions
        initialLiveManifestSize: 1, // Number of segments fetched initially for live content
        liveSyncDurationCount: 3, // Number of live sync segments to skip
        liveMaxLatencyDurationCount: 10, // Number of segments to load before considering a stream live
        enableWorker: true, // Enable worker for faster processing
        enableSoftwareAES: false, // Enable software-based AES decryption
        maxFragLookUpTolerance: 0.2, // Maximum tolerance to look for a fragment in the fragment tracker
        liveBackBufferLength: 20, // Length of buffer for live content (in seconds)
        liveBackBufferReached: false, // Whether the live back buffer was reached
        liveDurationInfinity: false, // Treat a live duration as infinity
        maxAudioFramesDrift: 1, // Maximum number of audio frames to drift for synchronization
    };

    
    //Properties link
    // https://vimejs.com/components/providers/hls

	/** link getter
	 * All player properties are available through the store. If you prefer, you could also pass 
	 * properties directly to the player and listen for events.
	 */
    /*
	const { paused } = usePlayerStore(() => player);

	const onPlaybackReady = () => {
		// ...
	};

	$: console.log($paused);
    */

    //INSTALL : 
    // npm i @vime/core @vime/svelte
    // npm i hls.js

        /*
    <Player
        theme="dark"
        style="--vm-player-theme: #cc234d;"
    >
        <Hls
            crossOrigin=""
            version="latest"  
            config="{hlsConfig}" 
            poster="https://media.vimejs.com/poster.png"
        >
            <source 
            data-src="https://media.vimejs.com/hls/index.m3u8" 
            type="application/x-mpegURL" 
            />  
        </Hls>
    </Player>
    */

   onMount(() => {
        defineCustomElements();
    });
</script>

<head>
<!-- Default theme. ~960B -->
    <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/default.css"
    />
<!-- Optional light theme (extends default). ~400B -->
    <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/light.css"
    />
</head>
<div id="container-video">

	<Player >
        <!--
		<Video crossOrigin="" poster="https://media.vimejs.com/poster.png">
			<source data-src="https://media.vimejs.com/720p.mp4" type="video/mp4">
		</Video>
        -->
        <Hls version="latest" config="{hlsConfig}" poster="/media/poster.png">
            <source data-src="/media/index.m3u8" type="application/x-mpegURL" />
        </Hls>

		<DefaultUi>
			<TapSidesToSeek />
		</DefaultUi>
	</Player>
</div>

<style>
	#container-video {
		width:900px;
        height: 600px;

		max-width: 960px;
        background-color: white;
        position: absolute;
        top: 20%;
        left: 0;
	}
</style>