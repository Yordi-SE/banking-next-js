import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

function Home() {
    const loggedIn = {firstName: "Yordanos", lastName:"LMW", email:"yordanoslemmawork54@gmail.com"}
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox type="greeting" title="Welcome" user={loggedIn.firstName || "Guest"}
                subtext="Access your account information, transfer funds, and more."
                />
                <TotalBalanceBox 
                accounts={[]}
                totalBanks={1}
                totalCurrentBalance={1250.35}/>
            </header>
        </div>
        <RightSideBar 
        user={loggedIn}
        transactions={[]}
        banks={[]}

        />
    </section>
  )
}

export default Home