import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/appwrite'
import React from 'react'

async function Home({searchParams: {id, page}}: SearchParamProps) {
    const currentPage = Number(page as string) || 1
    const loggedIn = await getLoggedInUser()
    const accounts = await getAccounts({userId: loggedIn.$id})

    if (!accounts) {
        return <div>Loading...</div>
    }

    const accountsData = accounts?.data;
    const appwriteItemId = (id as string) || accountsData[0].appwriteItemId;

    const account = await getAccount({appwriteItemId})

  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox type="greeting" title="Welcome" user={loggedIn?.firstName || "Guest"}
                subtext="Access your account information, transfer funds, and more."
                />
                <TotalBalanceBox 
                accounts={accountsData}
                totalBanks={accounts?.totalBanks}
                totalCurrentBalance={accounts.totalCurrentBalance}/>
            </header>

            <RecentTransactions accounts={accountsData} transactions={account?.transactions}
            appwriteItemId={appwriteItemId}
            page={currentPage}/>
        </div>
        <RightSideBar 
        user={loggedIn}
        transactions={account.transactions}
        banks={accountsData?.slice(0,2)}

        />
    </section>
  )
}

export default Home