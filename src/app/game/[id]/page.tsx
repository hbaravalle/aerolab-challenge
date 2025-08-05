import Image from 'next/image';
import Link from 'next/link';
import { LuCalendar, LuPuzzle, LuStar } from 'react-icons/lu';

import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';

export default function GameDetail() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <Image
          className="overflow-hidden rounded-lg object-cover"
          width={170}
          height={226}
          src="https://images.igdb.com/igdb/image/upload/t_cover_big/co66n7.jpg"
          alt="Grand Theft Auto V: Story Mode Cover"
        />
        <div>
          <h1 className="text-h1 bg-gradient-linear bg-clip-text text-transparent">
            Grand Theft Auto V
          </h1>
          <small className="text-h3 text-violet-100">Rockstar Games</small>
        </div>
      </div>
      <Button>Collect game</Button>
      <div className="flex flex-wrap items-center gap-2">
        <Chip icon={<LuStar strokeWidth={2.5} />} label="Rating" value="8.9" />
        <Chip
          icon={<LuCalendar strokeWidth={2.5} />}
          label="Release"
          value="9/16/2013"
        />
        <Chip
          icon={<LuPuzzle strokeWidth={2.5} />}
          label="Genre"
          value="Card & Board Game"
        />
      </div>
      <div>
        <h2 className="text-h2 mb-2">Summary</h2>
        <p className="text-sm text-gray-500">
          Grand Theft Auto V is a vast open world game set in Los Santos, a
          sprawling sun-soaked metropolis struggling to stay afloat in an era of
          economic uncertainty and cheap reality TV. The game blends
          storytelling and gameplay in new ways as players repeatedly jump in
          and out of the lives of the game’s three lead characters, playing all
          sides of the game’s interwoven story.
        </p>
      </div>
      <div>
        <h2 className="text-h2 mb-2">Platforms</h2>
        <p className="text-sm text-gray-500">
          PC (Microsoft Windows), PlayStation 3, Playstation 4, XBOX 360, XBOX
          One
        </p>
      </div>
      <div>
        <h2 className="text-h2 mb-2">Media</h2>
      </div>
      <div>
        <h2 className="text-h2 bg-gradient-linear mb-2 bg-clip-text text-transparent">
          Similar games
        </h2>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
          <Link href="/game/1">
            <img
              className="overflow-hidden rounded-lg object-cover"
              src="https://images.igdb.com/igdb/image/upload/t_cover_big/co66n7.jpg"
              alt="Grand Theft Auto V: Story Mode Cover"
            />
          </Link>
          <Link href="/game/1">
            <img
              className="overflow-hidden rounded-lg object-cover"
              src="https://images.igdb.com/igdb/image/upload/t_cover_big/co66n7.jpg"
              alt="Grand Theft Auto V: Story Mode Cover"
            />
          </Link>
          <Link href="/game/1">
            <img
              className="overflow-hidden rounded-lg object-cover"
              src="https://images.igdb.com/igdb/image/upload/t_cover_big/co66n7.jpg"
              alt="Grand Theft Auto V: Story Mode Cover"
            />
          </Link>
          <Link href="/game/1">
            <img
              className="overflow-hidden rounded-lg object-cover"
              src="https://images.igdb.com/igdb/image/upload/t_cover_big/co66n7.jpg"
              alt="Grand Theft Auto V: Story Mode Cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
