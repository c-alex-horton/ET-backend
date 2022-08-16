CREATE DATABASE emotiontrackdev;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE article(
    article_id BIGSERIAL PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    emotion VARCHAR(50) NOT NULL,
    flagged BOOLEAN,
    notes VARCHAR(255),
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);