import React from 'react';
import PropTypes from 'prop-types';
import { getArticle } from '../api';

export default class Article extends React.Component {
    static propTypes = {
        teamId: PropTypes.string.isRequired,
        articleId: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired
    }

    state = {
        article : null
    }

    componentDidMount = () => {
        const { teamId, articleId } = this.props;
        this.getArticle(teamId, articleId);
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.articleId !== prevProps.articleId) {
            this.getArticle(this.props.teamId, this.props.articleId);
        }
    }

    getArticle = (teamId, articleId) => {
        this.setState(() => ({
            article: null
        }))

        getArticle(teamId, articleId)
            .then(article => this.setState(() => ({
                article
            })));
    };

    render() {
        return this.props.children(this.state.article);
    }
}
