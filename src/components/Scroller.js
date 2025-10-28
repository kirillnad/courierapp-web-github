import React from 'react';


export default class Scroller extends React.Component {
   scrolldiv = React.createRef();

  scrollToTop = () => {
    if (this.scrolldiv.current) {
      this.scrolldiv.current.scrollTop = 0;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.scrollToTop === 0 && prevProps.scrollToTop !== 0) {
      this.scrollToTop();
      if (this.props.changeState) {
        this.props.changeState('scrollToTop', null);
      }
    }
  }

  render () {
    // no side-effects in render; handled in componentDidUpdate

    const content = {
      position: 'fixed', left: 0, right: 0, top: '56px', bottom: '48px',
      overflowY: 'auto', overflowX: 'hidden'
    }

    return (
      <div
        className="app-scroller"
        style={content}
        ref={this.scrolldiv}
        onScroll={e => this.props.changeState && this.props.changeState('scrollToTop', e.target.scrollTop)}
      >
        {this.props.children}
      </div>
    )
  }
}
