import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getNews = async () => {
            try {
                // Pointing to your backend port 5000
                const res = await axios.get('http://localhost:5000/api/news');
                setArticles(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Could not load history news", err);
                setLoading(false);
            }
        };
        getNews();
    }, []);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '1.5rem' }}>
                📜 Loading the latest scrolls...
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <h1 style={styles.title}>History Gazette</h1>
                <p style={styles.tagline}>Global Archaeological Discoveries • Updated Weekly</p>
            </header>

            <div style={styles.grid}>
                {articles.map((item, index) => (
                    <article key={index} style={styles.card}>
                        <div style={styles.dateBadge}>
                            {new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <h2 style={styles.articleTitle}>{item.title}</h2>
                        <p style={styles.preview}>
                            {item.content ? item.content.replace(/<[^>]*>?/gm, '').substring(0, 180) + "..." : "New discovery reported."}
                        </p>
                        <a href={item.link} target="_blank" rel="noreferrer" style={styles.readMore}>
                            View Full Report →
                        </a>
                    </article>
                ))}
            </div>
        </div>
    );
};

const styles = {
    page: {
        backgroundColor: '#f4f1ea', // Paper color
        minHeight: '100vh',
        padding: '40px 20px',
        fontFamily: '"Georgia", serif'
    },
    header: {
        textAlign: 'center',
        marginBottom: '50px',
        borderBottom: '2px solid #333',
        maxWidth: '800px',
        margin: '0 auto 50px auto'
    },
    title: { fontSize: '3.5rem', margin: '0', color: '#1a1a1a', textTransform: 'uppercase' },
    tagline: { fontSize: '1.1rem', color: '#666', marginBottom: '10px' },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '25px',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    card: {
        backgroundColor: '#fff',
        padding: '25px',
        boxShadow: '5px 5px 0px #dcd7c9', // Retro shadow
        border: '1px solid #dcd7c9',
        position: 'relative'
    },
    dateBadge: {
        backgroundColor: '#8d6e63',
        color: '#fff',
        display: 'inline-block',
        padding: '3px 10px',
        fontSize: '0.8rem',
        marginBottom: '10px'
    },
    articleTitle: { fontSize: '1.4rem', lineHeight: '1.2', margin: '10px 0' },
    preview: { color: '#444', fontSize: '0.95rem', lineHeight: '1.6' },
    readMore: { 
        display: 'block', 
        marginTop: '20px', 
        color: '#8d6e63', 
        fontWeight: 'bold', 
        textDecoration: 'none',
        borderTop: '1px solid #eee',
        paddingTop: '10px'
    }
};

export default News;