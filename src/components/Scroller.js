import React from 'react';


export default class Scroller extends React.Component {
   scrolldiv = React.createRef();

  scrollToTop = () => {
    this.scrolldiv.current.scrollTop = this.props.scrollToTop;
  }

  render () {
    if (this.props.scrollToTop === 0) this.scrollToTop()

    const content = {
      position: 'fixed', left: 0, right: 0, top: '56px', bottom: '48px',
      overflowY: 'auto', overflowX: 'hidden'
    }

    return (
      <div style={content} ref={this.scrolldiv} onScroll={this.props.scrollToTop}>
        {this.props.children}
      </div>
    )
  }
}
