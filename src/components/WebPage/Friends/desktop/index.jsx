import NavBar from '../../NavBar/desktop';
import UserRow from '../UserRow';

const FriendsDesktop = ({suggestions,friends,sentRequests,pendingRequests, handleAcceptRequest, handleCancelRequest, handleSendRequest}) => {
    return(
        <>
        <NavBar />
        <main className="flex-grow w-full max-w-screen-xl mx-auto px-6 py-12 text-left">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8 space-y-8 text-left">
              <section className="bg-white dark:bg-slate-900 rounded-3xl border border-solid border-outline-variant p-8 shadow-sm">
                <h1 className="text-3xl font-black text-primary m-0 uppercase tracking-tight">Znajomi ({friends.length})</h1>
                <div className="mt-8 divide-y divide-solid divide-slate-100 dark:divide-slate-800">
                  {friends.map(f => <UserRow key={f._id} person={f} type="friend"  handleAcceptRequest={handleAcceptRequest} handleCancelRequest={handleCancelRequest} handleSendRequest={handleSendRequest} />)}
                  {friends.length === 0 && <p className="py-10 text-center text-slate-400">Twoja lista znajomych jest pusta.</p>}
                </div>
              </section>

              {sentRequests.length > 0 && (
                <section className="bg-white dark:bg-slate-900 rounded-3xl border border-solid border-outline-variant p-8 shadow-sm">
                  <h2 className="text-xl font-black m-0 uppercase">Wysłane zaproszenia</h2>
                  <div className="mt-6 divide-y divide-solid divide-slate-100 dark:divide-slate-800">
                    {sentRequests.map(r => <UserRow key={r._id} person={r} type="sent" handleAcceptRequest={handleAcceptRequest} handleCancelRequest={handleCancelRequest} handleSendRequest={handleSendRequest} />)}
                  </div>
                </section>
              )}
            </div>
            <aside className="col-span-4 space-y-8 text-left">
              {pendingRequests.length > 0 && (
                <section className="bg-white dark:bg-slate-900 rounded-3xl border border-solid border-secondary/30 p-6 shadow-sm">
                  <h2 className="text-lg font-black m-0 mb-4">Zaproszenia</h2>
                  {pendingRequests.map(r => <UserRow key={r._id} person={r} type="request" handleAcceptRequest={handleAcceptRequest} handleCancelRequest={handleCancelRequest} handleSendRequest={handleSendRequest} />)}
                </section>
              )}
              <section className="bg-white dark:bg-slate-900 rounded-3xl border border-solid border-outline-variant p-6 shadow-sm">
                <h2 className="text-lg font-black m-0 mb-4">Sugerowani</h2>
                {suggestions.map(s => <UserRow key={s._id} person={s} type="suggestion" handleAcceptRequest={handleAcceptRequest} handleCancelRequest={handleCancelRequest} handleSendRequest={handleSendRequest} />)}
              </section>
            </aside>
          </div>
        </main>
        </>
    )
}
export default FriendsDesktop;