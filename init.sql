CREATE TABLE types (
                       id SERIAL PRIMARY KEY,
                       name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE status (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE transactions (
                              id SERIAL PRIMARY KEY,
                              type_id INTEGER NOT NULL,
                              status_id INTEGER NOT NULL,
                              external_id uuid NOT NULL UNIQUE,
                              value DECIMAL(10, 2) NOT NULL,
                              created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                              account_debit_id INTEGER NOT NULL,
                              account_credit_id INTEGER NOT NULL
);

CREATE TABLE accounts (
                          id SERIAL PRIMARY KEY,
                          external_id uuid NOT NULL UNIQUE,
                          balance DECIMAL(10, 2) NOT NULL DEFAULT 0
);

ALTER TABLE transactions
    ADD FOREIGN KEY (type_id) REFERENCES types(id),
    ADD FOREIGN KEY (status_id) REFERENCES status(id),
    ADD FOREIGN KEY (account_debit_id) REFERENCES accounts(id),
    ADD FOREIGN KEY (account_credit_id) REFERENCES accounts(id);

INSERT INTO types (name) VALUES
                             ('CREDIT'),
                             ('DEBIT');

INSERT INTO status (name) VALUES
                              ('PENDING'),
                              ('APPROVED'),
                              ('REJECTED');

INSERT INTO accounts (external_id, balance) VALUES
                                                ('20197de7-0ff2-40c0-9060-a127e6f92c17', 3000),
                                                ('d6da73b4-e101-4166-b8f3-f87efe24f458', 5000);

