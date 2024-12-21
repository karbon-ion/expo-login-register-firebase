import { Link, router, Tabs } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import { auth, firestore } from '~/utils/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useAppContext } from '~/hooks/context';
import Loading from '~/components/Loading';

export default function TabLayout() {

  const { setUser } = useAppContext()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    auth.onAuthStateChanged(async (userRef) => {
      if (userRef?.uid && userRef.emailVerified) {
        const userData = await getDoc(doc(firestore, 'users', userRef?.uid))
        if (userData.exists()) {
          const data = userData.data()
          setUser({ ...data, uid: userRef.uid })
          router.replace(data.role === 'user' ? '/(user)/home' : '/(admin)/dashboard')
        }
      }else{
        setLoading(false)
      }
    })
  }, [])


  return (
    <>
      {loading ?
        <Loading /> :
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: 'black',
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Tab One',
              tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
              headerRight: () => (
                <Link href="/modal" asChild>
                  <HeaderButton />
                </Link>
              ),
            }}
          />
          <Tabs.Screen
            name="register"
            options={{
              title: 'Register',
              tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            }}
          />
        </Tabs>
        }
    </>
  );
}
