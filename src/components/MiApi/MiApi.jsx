import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

const MiApi = ({ username }) => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${username}/${repos}`, {
                    headers: {
                        Authorization: `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`, // Optional: Include if you generated a token
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setRepos(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [username, repos]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>{username}'s Repositories</h2>
            <ul>
                {repos.map(repo => (
                    <li key={repo.id}>{repo.name}</li>
                ))}
            </ul>
        </div>
    );
};

MiApi.propTypes = {
    username: PropTypes.string.isRequired,
};

export default MiApi;
