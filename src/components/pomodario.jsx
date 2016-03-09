import React          from 'react';
import Notify          from 'notifyjs';
import { Button }     from 'react-bootstrap';
import { Col }     from 'react-bootstrap';
import { Input }     from 'react-bootstrap';
import { ProgressBar }     from 'react-bootstrap';

class LaterApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: this.props.timer,
      count:0
    }
  }


  componentDidMount(){
    this.timer = setInterval(function () {
      this.setState({
        count: this.state.count +1
      })

      console.log(this.state.count)
      if (this.state.count == this.state.timer){
        this.doNotify()
        clearInterval(this.timer)
      }

    }.bind(this), 1000)
  };

  componentWillUnmount () {
    clearInterval(this.timer)
  };
  
  render(){
    var remain = this.state.timer - this.state.count

    return (
      <div> 
        <Col xs={3}>
          <ProgressBar active 
            now={(this.state.count/ this.state.timer)*100}
          />
        </Col>
        {Math.floor(remain/60)} : {remain%60}
      </div>
    )
  };

  onPermissionGranted() {
      console.log('Permission has been granted by the user');
      doNotification();
  };

  doNotification() {
      var myNotification = new Notify('Yo dawg!', {
          body: 'This is an awesome notification',
          tag: 'unique tag',
          timeout: 30,
          icon: 'assets/CD.jpg'
      });
      //console.log('myNotification: ', myNotification)
      myNotification.show();
  };

  doNotify(){
    console.log(Notify)
    if (!Notify.needsPermission) {
        this.doNotification();
    } else if (Notify.isSupported()) {
        Notify.requestPermission(this.onPermissionGranted, this.onPermissionDenied);
    }
  };
}



class PomodarioApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      timer: 0,
      min: 0,
      sec: 0
    }
  }

  changeEdit(){
    this.setState({
      timer: parseInt(this.state.min)*60 + parseInt(this.state.sec)
    })
    console.log('min: ', this.state.min, 'sec: ', this.state.sec, 'timer: ', this.state.timer )

    this.setState({edit: !this.state.edit});
  };
  changeMin(event){
    console.log(this)
    this.setState({
      min: event.target.value,
    })
  };
  changeSec(event){
    this.setState({
      sec: event.target.value,
    })
  };
  render(){
    if (this.state.edit){
      return (
        <div onClick={this.changeEdit.bind(this)}>
        {
          <LaterApp timer={this.state.timer}/>
        }
        </div>
      )
    }else{
      return (
        <div >
          <Col xs={1}>
            <Input type="text" 
                   value={this.state.value} 
                   onChange = {this.changeMin.bind(this)}
                   placeholder="minute"/> 
          </Col>
          <Col xs={1}>
            <Input type="text" 
                   value={this.state.value} 
                   onChange = {this.changeSec.bind(this)}
                   placeholder="second"/> 
          </Col>
          <Button onClick={this.changeEdit.bind(this)}>OK</Button>
        </div>
      )
    }
  }
}

export default PomodarioApp
