import React from 'react'
import { Pagination } from 'antd';
import { handleRateChange } from 'video-react/lib/actions/video';


export default class VideoPagination extends React.Component{
    constructor(props){
        super(props);
        this.state={
            defaultCurrent:1,
            defaultPageSize:12
        }
    }
    render(){
        return(
            <div style={{ bottom: "1%", width: "100%", float: "right", paddingLeft: "60%" }}>
                <Pagination defaultPageSize={this.state.defaultPageSize} showQuickJumper 
                defaultCurrent={this.state.defaultCurrent} total={this.props.total} 
                onChange={this.onChange.bind(this)} />
            </div>
        );
    }
    onChange(targetPage) {
        console.log('Page: ', targetPage);   
        this.setState({
            defaultCurrent:targetPage
        });
        this.props.handleChangePage(targetPage);
    }
}
