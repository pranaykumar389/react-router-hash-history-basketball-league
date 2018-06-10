import React from 'react';
import { getTeamsArticles } from '../api';
import Sidebar from './Sidebar';
import { Route } from 'react-router-dom';
import Article from './Article';

export default class Articles extends React.Component {
    state = {
        loading: true,
        teamsArticles: []
    }

    componentDidMount = () => {
      getTeamsArticles(this.props.match.params.teamId)
        .then(teamsArticles => (this.setState({
            loading: false,
            teamsArticles: teamsArticles.map(article => article.title)
        })));
    }
    

    render() {
        const { loading, teamsArticles } = this.state;
        const { params, url } = this.props.match;
        const { teamId } = params;

        return (
            loading ? 
                <h1>LOADING</h1> :
                    <div className='container two-column'>
                        <Sidebar 
                            loading={loading}
                            title='Articles'
                            list={teamsArticles}
                            {...this.props}
                        />

                        <Route path={`${url}/:articleId`} render={({ match }) => (
                            <Article articleId={match.params.articleId} teamId={teamId}>
                                {article => !article ? 
                                    <h1>LOADING</h1>:
                                    (<div className='panel'>
                                        <article className='article' key={article.id}>
                                            <h1 className='header'>{article.title}</h1>
                                            <p>{article.body}</p>
                                        </article>
                                    </div>)
                                }
                            </Article>
                        )} />
                    </div>
        );
    }
}
