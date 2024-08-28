<?php

namespace App\Support;

class Environment
{
    /**
     * Initialize new Environment instance.
     *
     * @param string $name
     * @param string $key
     * @param string $url
     * @param string $dbHost
     * @param string $dbPort
     * @param string $dbName
     * @param string $dbUser
     * @param string $dbPassword
     *
     * @return void
     */
    public function __construct(
        protected string $name,
        protected string $key,
        protected string $url,
        protected string $dbHost,
        protected string $dbPort,
        protected string $dbName,
        protected string $dbUser,
        protected string $dbPassword,
    ) {
    }

    /**
     * Get the application name
     *
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Get the application key
     *
     * @return string
     */
    public function getKey(): string
    {
        return $this->key;
    }

    /**
     * Get the application url
     *
     * @return string
     */
    public function getUrl(): string
    {
        return $this->url;
    }

    /**
     * Get the database hostname
     *
     * @return string
     */
    public function getDbHost(): string
    {
        return $this->dbHost;
    }

    /**
     * Get the database port
     *
     * @return string
     */
    public function getDbPort(): string
    {
        return $this->dbPort;
    }

    /**
     * Get the database name
     *
     * @return string
     */
    public function getDbName(): string
    {
        return $this->dbName;
    }

    /**
     * Get the database user
     *
     * @return string
     */
    public function getDbUser(): string
    {
        return $this->dbUser;
    }

    /**
     * Get the database password
     *
     * @return string
     */
    public function getDbPassword(): string
    {
        return $this->dbPassword;
    }
}
