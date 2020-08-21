import React from 'react';
import {Grid} from '@material-ui/core';
import youtube from './api/youtube';
import {SearchBar, VideoDetail,VideoList} from './components';
import {styles} from './api/App.module.css';

class App extends React.Component{
    state={
        videos: [],
        selectedVideo: null
    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('https://www.googleapis.com/youtube/v3/search',{
        params: {
            part: 'snippet',
            maxResults: 7,
            key: 'AIzaSyBFVdx-8AWeMWbTx83cNTH6XTlTFZNIuPQ',
            q: searchTerm,
        }
    });
    this.setState({videos: response.data.items, selectedVideo: response.data.items[0]});
    }

    onVideoSelect = (video) => {
        this.setState({selectedVideo: video});

    }


    render(){
        const {selectedVideo, videos}= this.state;
        return (

            <Grid justify="center" container spacing={5}>
            <h1 className={styles}> YOUTUBE-CLONE </h1>
                <Grid item xs={12}>
                    <Grid container spacing ={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit}/>
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={selectedVideo} />
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;