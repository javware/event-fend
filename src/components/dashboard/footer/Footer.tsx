import { PiFacebookLogoLight, PiInstagramLogoLight, PiTiktokLogoLight, PiYoutubeLogoLight } from "react-icons/pi";

export default function footer() {
    return (
        <div className="flex md:flex-row flex-col items-center justify-between bg-white bottom-0 sticky w-full py-3.5 px-6 text-sm text-gray-400">
            <div className="flex md:flex-row flex-col items-center gap-6 ">
                <h3 className="font-medium">© 2024 Javware Perú </h3>
                <h3 className="text-gray-300">Políticas y Privacidad</h3>
                <h3 className="text-gray-300">Term y condiciones</h3>
                <h3 className="text-gray-300">Contacto</h3>
            </div>

            <div className="flex items-center gap-3 text-2xl">
                <PiFacebookLogoLight />
                <PiTiktokLogoLight />
                <PiYoutubeLogoLight />
                <PiInstagramLogoLight />
            </div>
        </div>
    )
}
