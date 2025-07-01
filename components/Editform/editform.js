import e from './editform.module.css'
export default function Editform(){
    return(
        <div>
        <div className={e.formparent}>
            <div>
                <div className={e.generalform}>
                    General
                </div>

                <div>
                    <label>
                        <input type="radio" name="widthMode" value="pixels" />
                        In Pixels
                        </label>
                        <label>
                        <input type="radio" name="widthMode" value="responsive" defaultChecked />
                        Responsive (Mobile friendly)
                    </label>
                </div>
            </div>

            <div>
                <div>
                    Feed Title
                </div>
                <div>
                    
                </div>
            </div>

            <div>
                <div>
                    Feed Content
                </div>
                <div>
                    
                </div>
            </div>

            </div>
            </div>
    );
}