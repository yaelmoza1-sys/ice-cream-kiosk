function Flavor({oneFlavor}) {
    return (
        <div className={styles.flavor}>
            <h3>{oneFlavor.name}</h3>
            <span>Quantity: {oneFlavor.scoopsSelected}</span>
            <div>
                <button className={styles.btnLeft}>-</button>
                <button className={styles.btnRight}>+</button>
            </div>
        </div>
    );
}


export default Flavor;