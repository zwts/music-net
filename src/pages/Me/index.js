import React from "react";
import { Component } from "react";

import OneLineLi from "../../../kaid/site/template/one-line-li";
import TwoLinesLi from "../../../kaid/site/template/two-line-li";
import { List } from 'kaid';

import "./index.scss";
const collect = 'http://img.88icon.com/download/jpg/202002/b76624d4ae8cef3d02f3ec2a39d4d592.jpg!88con';
const recent = 'https://img.88icon.com/download/jpg/20200801/f3b07ea48399a6111c182c5945e9fce4_512_512.jpg!88bg';
const dynamic = 'https://img.88icon.com/download/jpg/20200730/ed9c19ce0b818c837e68e88fbf3682c8_512_512.jpg!88bg';
const socialHub = 'https://img.88icon.com/download/jpg/20200720/961023a124a9d55a5ee707251135aa0e_512_512.jpg!88con';
const news = 'data:image/png;base64,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';

const userDetail = {"level":10,"listenSongs":27060,"userPoint":{"userId":32953014,"balance":1014,"updateTime":1607655210412,"version":10,"status":1,"blockBalance":0},"mobileSign":false,"pcSign":false,"profile":{"avatarDetail":null,"avatarImgIdStr":"109951165296429770","backgroundImgIdStr":"109951163792144631","description":"","userId":32953014,"djStatus":0,"province":440000,"vipType":11,"followed":false,"createTime":1407747900967,"backgroundImgId":109951163792144620,"userType":0,"authStatus":0,"detailDescription":"","experts":{},"expertTags":null,"city":440300,"defaultAvatar":false,"backgroundUrl":"http://p1.music.126.net/WLTBvNL_l9ZKlslFwaCM9Q==/109951163792144631.jpg","avatarUrl":"http://p1.music.126.net/6_VP5dKL4G6xGNRLYs19Sw==/109951165296429770.jpg","mutual":false,"remarkName":null,"avatarImgId":109951165296429780,"birthday":768931200000,"gender":1,"nickname":"binaryify","accountStatus":0,"signature":"深圳市爱猫人士","authority":0,"followeds":33,"follows":11,"blacklist":false,"eventCount":16,"allSubscribedCount":0,"playlistBeSubscribedCount":5,"avatarImgId_str":"109951165296429770","followTime":null,"followMe":false,"artistIdentity":[],"cCount":0,"sDJPCount":0,"playlistCount":17,"sCount":0,"newFollows":11},"peopleCanSeeMyPlayRecord":false,"bindings":[{"url":"","userId":32953014,"tokenJsonStr":null,"expired":false,"expiresIn":2147483647,"refreshTime":1592285666,"bindingTime":1426295169224,"id":28098251,"type":1},{"url":"http://weibo.com/u/5144142752","userId":32953014,"tokenJsonStr":null,"expired":true,"expiresIn":2628968,"refreshTime":1507142393,"bindingTime":1407747883151,"id":18574366,"type":2}],"adValid":false,"code":200,"createTime":1407747900967,"createDays":2314};

class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.focus();
  }

  focus() {
    if (this.list) {
      this.list.container.focus();
    } else if (this.element) {
      this.element.focus();
    }
  }


  handleKeyDown(e) {
    if (e.type === 'keydown') {
      switch (e.key) {

        case 'Backspace':
          e.preventDefault();
          e.stopPropagation();
          this.props.history.push('/home');
          break;
        default:
          break;
      }
    }
  }

  render() {
    return (
      <div className="me-page-container"
        ref={ref => {this.element = ref}}
        onKeyDown={this.handleKeyDown}
        tabIndex="-1"
        >
        <div className="me-page-wrap" >
          <img className="avatar" src={userDetail.profile.avatarUrl} />
          <div className="personal-information">
            <div className="nickname-level">
              <div className="nickname h4">{userDetail.profile.nickname}</div>
              <div className="level">LV<span>{userDetail.level}</span></div>
            </div>
            <div className="signature p-thi">{userDetail.profile.signature}</div>
          </div>
        </div>
        <List ref={(list) => { this.list = list;}}>
          <TwoLinesLi lineText1="collect" lineText2="recent" icon1={collect} icon2={recent}></TwoLinesLi>
          <OneLineLi lineText2="dynamic" icon={dynamic}></OneLineLi>
          <OneLineLi lineText2="social hub" icon={socialHub}></OneLineLi>
          <OneLineLi lineText2="news" icon={news}></OneLineLi>
        </List>
      </div>
    )
  }

}

export default Me
