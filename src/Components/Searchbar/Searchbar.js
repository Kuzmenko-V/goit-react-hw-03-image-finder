import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

class Searchbar extends Component {
    state = {
        searchText: ''
    };
    inputChange = e => {
      const { name, value } = e.currentTarget;
      this.setState({ [name]: value});
    };
    formSabmit = e => {
        e.preventDefault();
        if (this.state.searchText.trim() === '') {
            toast.info('Введите цель поиска!');
            return;
        }
        this.props.onSubmit(this.state.searchText.trim());
        this.setState({ searchText: '' });
    };
    render() {
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={ this.formSabmit }>
                <button type="submit" className="SearchForm-button">
                  <span className="SearchForm-button-label">Search</span>
                </button>
                 <input
                  name="searchText"
                  className="SearchForm-input"
                  type="text"
                  autoComplete="off"
                  autoFocus
                  placeholder="Поиск изображений и фотографий"
                  value={this.state.searchText}
                  onChange={this.inputChange}  
                />
             </form>
            </header>
        );
    };

}

Searchbar.propTypes = {
    onSubmit: PropTypes.func
};
export default Searchbar;