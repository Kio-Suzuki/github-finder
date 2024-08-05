import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import { RepoProps } from "../types/repo";
import Loader from "../components/Loader";
import Repo  from "../components/Repo";
import styles from "./Repos.module.css";

function Repos() {

    const { username } = useParams();

    const [repos, setRepos] = useState<RepoProps[] | [] | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const loadRepos = async function(username: string) {
            const res = await fetch(`https://api.github.com/users/${username}/repos`);
            const data = await res.json();
            setIsLoading(false);

            let orderedRepos = data.sort(
                (a: RepoProps, b: RepoProps) => { b.stargazers_count - a.stargazers_count }
            );

            orderedRepos = orderedRepos.slice(0, 5);

            setRepos(orderedRepos);
        };
        if (username) {
            loadRepos(username);
        }
    },[]);

    if(!repos && isLoading) return <Loader />;

    return (
        <div className={styles.repos}>
            <BackBtn />
            <h2>Explore os repositórios do usuário: {username}</h2>
            {repos && repos.length === 0 && <p>Não há repositórios.</p>}
            {repos && repos.length > 0 && (
               <div className={styles.repos_container}>
                    {repos.map((repo: RepoProps) => (
                        <Repo key={repo.name} {...repo}/>
                ))}
               </div>
            )}
        </div>
    );
};

export default Repos;
