import React from 'react';

class Form extends React.Component {

  render() {
    return (
      <div>
        <form onSubmit= {this.props.getUserInput}>
          <input type='text' name='location' placeholder='location'/>
          <input type='int' name='radius' placeholder='radius'/>
          <input type='text' name='category' placeholder='category'/>
          <button>Get Info</button>
        </form>
      </div>
    );
  }
};

export default Form;