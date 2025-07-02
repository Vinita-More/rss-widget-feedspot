import e from './editform.module.css'
export default function General(){
    return(
        <div>
        <div className={e.formparent}>
            <div>
                <div className={e.formtitle}>
                   <p> General</p>
                </div>

                {/* For width */}
                <div className={e.content}>
                    <p>Width</p>
                    <div className={e.row}>
                    <label>
                    <input type="radio" name="widthMode" value="pixels" />
                    In Pixels
                    </label>
                    <input type='text'/>
                    </div>
                <br />
                    <div className={e.row}>
                    <label>
                    <input type="radio" name="widthMode" value="pixels" />
                    Responsive (Mobile Friendly)
                    </label>
                    <input type='text'/>
                    </div>
                </div>
                <br /><br />

                {/* For Height */}
                <div className={e.content}>
                    <p>Height</p>
                    <div className={e.row}>
                    <label>
                    <input type="radio" name="widthMode" value="pixels" />
                    In pixels
                    </label>
                    <input type='text'/>
                    </div>
                <br />
                    <div className={e.row}>
                    <label>
                    <input type="radio" name="widthMode" value="pixels" />
                    Posts
                    </label>
                    <input type='text'/>
                    </div>
                </div>
                <br /><br />

                {/* autoscroll */}
                <div className={e.content}>
                    <p>Autoscroll</p>
                        <input type="radio" name="autoscroll" value="pixels" />yes
                        <input type="radio" name="autoscroll" value="pixels" />no
                <br />
                </div>
                <br /><br />

                {/* For open links */}
                <div className={e.content}>
                    <p>Open links</p>
                    <select>
                        <option>Same window</option>
                        <option>Different window</option>
                    </select>
                </div>

                {/* For Font style */}
                <br /><br />
                <div className={e.content}>
                    <p>Font styles</p>
                    <select>
                        <option>Default Browser font</option>
                        <option>Times New Roman</option>
                    </select>
                <br />
                </div>
                <br /><br />

                {/* For Border */}
                <div className={e.content}>
                    <p>Border</p>
                        <input type="radio" name="border" value="pixels" />Yes
                        <input type="radio" name="border" value="pixels" />No
                <br />
                </div>
                <br /><br />

                {/* Border color */}
                <div className={e.content}>
                    <p>Border color</p>
                        <input type="color" name="bordercolor" />
                <br />
                    </div>
                <br /><br />

            </div>

            {/* <div>
                <div className={e.formtitle}>
                    <p>  Feed Title </p>
                </div>
                <div className={e.content}>

                </div>
            </div>

            <div>
                <div className={e.formtitle}>
                   <p>   Feed Content  </p>
                </div>
                <div className={e.content}>

                </div>
            </div> */}

            </div>
            </div>
    );
}