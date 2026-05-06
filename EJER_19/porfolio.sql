use porfolio;

-- =========================
-- TABLA USERS
-- =========================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  bio TEXT,
  email VARCHAR(100) UNIQUE NOT NULL,
  photo VARCHAR(255)
);

-- =========================
-- TABLA PROJECTS
-- =========================
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  repo_url VARCHAR(255),
  live_url VARCHAR(255),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =========================
-- TABLA SOCIAL LINKS
-- =========================
CREATE TABLE social_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  platform VARCHAR(100),
  url VARCHAR(255),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =========================
-- INSERT USERS (MD5 passwords de ejemplo)
-- password = "1234"
-- =========================
INSERT INTO users (username, password, bio, email, photo) VALUES
('juan', MD5('1234'), 'Desarrollador Full Stack', 'juan@mail.com', ''),
('ana', MD5('1234'), 'Frontend developer', 'ana@mail.com', ''),
('carlos', MD5('1234'), 'Backend dev Node.js', 'carlos@mail.com', '');

-- =========================
-- INSERT PROJECTS
-- =========================
INSERT INTO projects (title, description, repo_url, live_url, user_id) VALUES
('Portfolio Web', 'Mi web personal', 'https://github.com/juan/portfolio', '', 1),
('API REST', 'API con Node.js', 'https://github.com/juan/api', '', 1),
('Landing Page', 'Página de producto', 'https://github.com/ana/landing', '', 2),
('Blog', 'Blog con Express', 'https://github.com/carlos/blog', '', 3);

-- =========================
-- INSERT SOCIAL LINKS
-- =========================
INSERT INTO social_links (platform, url, user_id) VALUES
('GitHub', 'https://github.com/juan', 1),
('LinkedIn', 'https://linkedin.com/in/juan', 1),
('GitHub', 'https://github.com/ana', 2),
('Twitter', 'https://twitter.com/carlos', 3);

select*from users;
select*from projects;
select*from social_links;