import React, { Component} from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import API from './apiService';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Modal from './Modal';

class ImageGallery extends Component {
    static defaultProps = {
        searchText: ''
    }
    state = {
        rezSearch: [],
        status: 'idle',
        showModal: false,
        activeImgIndex: null
    };
    componentDidUpdate(prevProps, prevState) {
        const prevSearchText = prevProps.searchText;
        const actualSearchText = this.props.searchText;
        if (prevSearchText !== actualSearchText) {
            this.setState({
                pageNomber: 1,
                status: 'pending'
            });
            API(actualSearchText, this.state.pageNomber)
                .then(rez => {
                    if (rez.hits.length) {
                        this.setState({
                            rezSearch: rez.hits, status: 'resolved'
                        })
                    }
                    else { this.setState({
                        error: { message: `Нет изображений по запросу "${actualSearchText}"` }, status: 'rejected'
                        }) }
                })
                .catch(error => this.setState({
                    error, status: 'rejected'
                }));
        }
        const prevPageNomber = prevState.pageNomber;
        const actualPageNomber = this.state.pageNomber;
        if (prevPageNomber !== actualPageNomber) {
            window.scrollTo({
               top: document.documentElement.scrollHeight,
               behavior: 'smooth',
            });
        }
    };
    loadMore = e => {
        e.preventDefault();   
        API(this.props.searchText, this.state.pageNomber + 1)
            .then(rez => this.setState(prevState => ({
               rezSearch: [...prevState.rezSearch, ...rez.hits],
                pageNomber: prevState.pageNomber + 1
                  
            })));
    };
    toggleModal = () => {
        this.setState(({showModal}) => ({
            showModal: !showModal
        }));
    }
    showImage = id => {
        const images = this.state.rezSearch;
        const imagesId = images.map(e => e.id);
        let i = imagesId.indexOf(id);
        this.setState({
            activeImgIndex: i,
        });
        this.toggleModal();
    };
    listImgModal = key => {
        const images = this.state.rezSearch;
        let i = this.state.activeImgIndex;
        i += key;
        if (i < 0) { i = images.length-1; }
        if (i === images.length) { i = 0;}
        this.setState({activeImgIndex: i});
    };
    render() {
        const { rezSearch, status, error , showModal , activeImgIndex} = this.state;
        if (status === "idle") {
            return <div></div>;
        }
        if (status === "pending") {
            return (
                <div className="conteinGallery">
                    <Loader
                     type="ThreeDots"
                     color="#3f51b5"
                     height={100}
                     width={100}
                    />
                </div>
            );
        }
        if (status === "rejected") {
            return (<div className="conteinGallery">
                      <h1>{error.message}</h1>;    
                    </div>);
        }
        if (status === "resolved") {
            return (
              <div className="conteinGallery">
                <ul className="ImageGallery">
                        <ImageGalleryItem Array={rezSearch} onClick={this.showImage}/>
                </ul>
                <button className="Button" onClick={this.loadMore}>Загрузить еще</button>
                    {showModal && <Modal onClose={this.toggleModal} onList={this.listImgModal}><img src={ rezSearch[activeImgIndex].largeImageURL} alt="" /></Modal>}
                </div>
            );
        }
    };

}

ImageGallery.propTypes = {
    searchText: PropTypes.string,
};

export default ImageGallery;