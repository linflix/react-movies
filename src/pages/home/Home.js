import React from 'react';     
import { Layout,Divider} from 'antd';
import Head from '../head/Head'
import VideoCard from '../card/Card'
import VideoPagination from '../pagination/VideoPagination'
import './Home.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";  
import API from '../../configs/api';
import VideoPlay from '../video/VideoPlay';
const { Header, Footer, Content } = Layout;
export default class Home extends React.Component{
   
    constructor(props){
        super(props);
        this.state = { 
            total:0,
            currentIndex:0,
            pageSize:12,
            videos:[]
         };
    }
    componentWillMount(){
        API.get('video/list',{
            params:{
                currentIndex:this.state.currentIndex,
                pageSize:this.state.pageSize
            }
        }).then(res=>{
            let result = res.data;
            console.log(result);
            if(result.success===true){
                this.setState({
                    videos:result.data
                });
            }
        })
        API.get("video/total").then(res=>{
            let result = res.data;
            console.log(result);
            if(result.success===true){
                console.log(result.data)
                this.setState({
                    total:result.data
                });
            }
        })
    }
     /**
     * 当页面发生变化的时候 需要触发。
     */
    pageChange(currentPage){
        console.log("i was called ",currentPage);
        let index = (currentPage-1)*this.state.pageSize;
        API.get('video/list',{
            params:{
                currentIndex:index,
                pageSize:this.state.pageSize
            }
        }).then(res=>{
            let result = res.data;
            console.log(result);
            if(result.success===true){
                this.setState({
                    videos:result.data
                });
            }
        })
    }
    render(){
        return(
            <div>
                <Layout>
                <Header><Head></Head></Header>
                <Content>
                    <div style={{float:"left",display:"inline"}}>
                        <div>
                            {
                                this.state.videos.map((item,index)=>{
                                    console.log(item);
                                    return(
                                        <Link to={"/video/"+item.mId}>
                                            <VideoCard key={index} movie={JSON.stringify(item)}/>
                                        </Link>
                                    );
                                })
                            }
                        </div>
                        <VideoPagination handleChangePage={this.pageChange.bind(this)} total = {this.state.total}/>
                    </div>
                </Content>
                <Footer>
                    <Divider />
                    <div className="bottomLable">
                        <span>使用条款和隐私条款。版权所有，保留一切权利。 赞助商：中国linflix-tec有限公司。 蒙ICP备xxxxxx01号</span>
                    </div>
                </Footer>
                </Layout>
            </div>
        );
    }
}
