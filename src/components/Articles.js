import React from 'react';
import { getTeamsArticles } from '../api';
import Sidebar from './Sidebar';

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
                    </div>
        );
    }
}
