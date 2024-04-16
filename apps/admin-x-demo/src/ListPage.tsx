import {Avatar, Button, ButtonGroup, DynamicTable, DynamicTableColumn, DynamicTableRow, Heading, Hint, Page, SortMenu, Tooltip, ViewContainer, showToast} from '@tryghost/admin-x-design-system';
import {Post, useBrowsePosts} from '@tryghost/admin-x-framework/api/posts';
import {useRouting} from '@tryghost/admin-x-framework/routing';
import {useState} from 'react';

type Author = {
    name: string;
    email: string;
    avatar: string;
    posts: number;
    revenue: number;
};

export
const ListPage = () => {
    const {updateRoute} = useRouting();
    const [view, setView] = useState<string>('list');
    const {data: {posts: fetchedPost} = {posts: []}} = useBrowsePosts(
        {
            searchParams: {
                include: 'authors,tags'
            }
        }
    );
    const authorInformation:Author[] = [];
    fetchedPost.map((post: any) => {
    //    Check if primary_author.name existed in the authorInformation array
    //    If not, add it to the array
        let author = authorInformation.find((_author:Author) => _author.name === post.primary_author.name);

        if (author === undefined) {
            author = {
                name: post.primary_author.name,
                email: post.primary_author.email,
                avatar: `https://i.pravatar.cc/150?img=${post.primary_author.profile_image}`,
                posts: +1,
                revenue: post.primary_tag?.bonus ?? 0
            };
            authorInformation.push(author);
        } else {
            author.posts += 1;
            author.revenue += post.primary_tag?.bonus ?? 0;
        }
    });
    const dummyActions = [
        <Button label='Filter' onClick={() => {
            showToast({message: 'Were you really expecting a filter? 😛'});
        }} />,
        <SortMenu
            direction='desc'
            items={[
                {
                    id: 'date-added',
                    label: 'Date added',
                    selected: true
                },
                {
                    id: 'name',
                    label: 'Name'
                },
                {
                    id: 'redemptions',
                    label: 'Open Rate'
                }
            ]}
            position="left"
            onDirectionChange={() => {}}
            onSortChange={() => {}}
        />,
        <Tooltip content="Search members">
            <Button icon='magnifying-glass' size='sm' onClick={() => {
                alert('Clicked search');
            }} />
        </Tooltip>,
        <ButtonGroup buttons={[
            {
                icon: 'listview',
                size: 'sm',
                iconColorClass: (view === 'list' ? 'text-black' : 'text-grey-500'),
                onClick: () => {
                    setView('list');
                }
            },
            {
                icon: 'cardview',
                size: 'sm',
                iconColorClass: (view === 'card' ? 'text-black' : 'text-grey-500'),
                onClick: () => {
                    setView('card');
                }
            }
        ]} clearBg={false} link />
    ];

    const testColumns: DynamicTableColumn[] = [
        {
            title: 'Author',
            noWrap: true,
            minWidth: '1%',
            maxWidth: '1%'
        },
        {
            title: 'Number of Posts'
        },
        {
            title: 'Revenue'
        }
    ];

    const testRows = (noOfRows : any) => {
        const data: DynamicTableRow[] = [];
        for (let i = 0; i < noOfRows.length; i++) {
            data.push(
                {
                    onClick: () => {
                        updateRoute('detail');
                    },
                    cells: [
                        (<div className='flex items-center gap-3 whitespace-nowrap pr-10'>
                            <Avatar image={`https://i.pravatar.cc/150?img=${i}`} />
                            <div>
                                <div className='whitespace-nowrap text-md'>{noOfRows[i].name}</div>
                                <div className='text-grey-700'>{noOfRows[i].email}</div>
                            </div>
                        </div>),
                        `${noOfRows[i].posts}`,
                        `${noOfRows[i].revenue}`
                    ]
                }
            );
        }
        return data;
    };

    const dummyCards = (noOfCards: number) => {
        const cards = [];

        for (let i = 0; i < noOfCards; i++) {
            cards.push(
                <div className='flex min-h-[20vh] cursor-pointer flex-col items-center gap-5 rounded-sm bg-grey-100 p-7 pt-9 transition-all hover:bg-grey-200' onClick={() => {
                    updateRoute('detail');
                }}>
                    <Avatar image={`https://i.pravatar.cc/150?img=${i}`} size='xl' />
                    <div className='flex flex-col items-center'>
                        <Heading level={5}>
                            {i % 3 === 0 && 'Jamie Larson'}
                            {i % 3 === 1 && 'Giana Septimus'}
                            {i % 3 === 2 && 'Zaire Bator'}
                        </Heading>
                        <div className='mt-1 text-sm text-grey-700'>
                            {i % 3 === 0 && 'jamie@larson.com'}
                            {i % 3 === 1 && 'giana@septimus.com'}
                            {i % 3 === 2 && 'zaire@bator.com'}
                        </div>
                    </div>
                    <div className='flex w-full flex-col gap-4 border-t border-grey-300 pt-5'>
                        {i % 3 === 0 && (<>
                            <div className='flex gap-4'>
                                <div className='basis-1/2 text-center'>
                                    <Heading level={6}>Open rate</Heading>
                                    <div className='text-lg'>83%</div>
                                </div>
                                <div className='basis-1/2 text-center'>
                                    <Heading level={6}>Click rate</Heading>
                                    <div className='text-lg'>19%</div>
                                </div>
                            </div>
                        </>)}
                        {i % 3 === 1 && (<>
                            <div className='flex gap-4'>
                                <div className='basis-1/2 text-center'>
                                    <Heading level={6}>Open rate</Heading>
                                    <div className='text-lg'>68%</div>
                                </div>
                                <div className='basis-1/2 text-center'>
                                    <Heading level={6}>Click rate</Heading>
                                    <div className='text-lg'>21%</div>
                                </div>
                            </div>
                        </>)}
                        {i % 3 === 2 && (<>
                            <div className='flex gap-4'>
                                <div className='basis-1/2 text-center'>
                                    <Heading level={6}>Open rate</Heading>
                                    <div className='text-lg'>89%</div>
                                </div>
                                <div className='basis-1/2 text-center'>
                                    <Heading level={6}>Click rate</Heading>
                                    <div className='text-lg'>34%</div>
                                </div>
                            </div>
                        </>)}
                    </div>
                </div>
            );
        }
        return cards;
    };

    let contents = <></>;
    switch (view) {
    case 'list':
        contents = <DynamicTable
            cellClassName='text-sm'
            columns={testColumns}
            footer={
                <Hint>30 members</Hint>
            }
            rows={testRows(authorInformation.sort((a,b) => a.posts - b.posts))}
            stickyFooter
            stickyHeader
        />;
        break;
    case 'card':
        contents = <div className='grid grid-cols-4 gap-8 py-8'>{dummyCards(30)}</div>;
        break;
    }

    const demoPage = (
        <Page>
            <ViewContainer
                actions={dummyActions}
                primaryAction={{
                    title: 'About',
                    onClick: () => {
                        updateRoute('demo-modal');
                    }
                }}
                title='AdminX Demo App'
                toolbarBorder={view === 'card'}
                type='page'
            >
                {contents}
            </ViewContainer>
        </Page>
    );

    return demoPage;
};

export default ListPage;
